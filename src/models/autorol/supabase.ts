import { supabase } from '../../supabase.js'
import { autorol, iAutorolModel } from './interface.js'
import { Collection } from 'offdjs/djs'

export class AutoroleModel implements iAutorolModel {
    cache = new Collection<string, autorol>()

    async create (guildId: string, name: string): Promise<autorol> {
        const req = await supabase.from('autorole_config').insert({
            guild: guildId,
            name,
        }).select()
        const config = req.data?.[0]
        if (config) {
            this.cache.set(guildId, { ...config, roles: [] })
            return { ...config, roles: [] }
        } else throw new Error('No se pudo crear la configuración')
    }

    async add (group: string, guild: string, role: string): Promise<autorol> {
        const g = await supabase.from('autorole_config').select().eq('guild', guild).eq('name', group)
        const config = g.data?.[0]
        if (!config) throw new Error('Group not found')
        const req = await supabase.from('autoroles_roles').insert({
            group: config.id,
            role,
        })
        if (req.error) throw new Error(req.error.message, { cause: req.error.details })
        const res = await supabase.from('autoroles_roles').select().eq('group', config.id)
        return {
            ...config,
            roles: res.data?.map(i => i.role) ?? [],
        }
    }

    async remove (group: string, guildId: string, roleId: string): Promise<autorol> {
        const g = await supabase
            .from('autorole_config')
            .select('*, autoroles_roles (*)')
            .eq('guild', guildId)
            .eq('name', group)
        const config = g.data?.[0]
        if (!config) throw new Error('Group not found')
        await supabase
            .from('autoroles_roles')
            .delete()
            .eq('group', config.id)
            .eq('role', roleId)
        return {
            ...config,
            roles: config.autoroles_roles.map(i => i.role).filter(i => i !== roleId),
        }
    }

    async delete_ (guildId: string, group: string): Promise<void> {
        const g = await supabase
            .from('autorole_config')
            .select()
            .eq('guild', guildId)
            .eq('name', group)
        const config = g.data?.[0]
        if (!config) throw new Error('Group not found')
        void supabase
            .from('autoroles_roles')
            .delete()
            .eq('group', config.id)
        void supabase
            .from('autorole_config')
            .delete()
            .eq('id', config.id)
    }

    async get (guildId: string, group: string): Promise<autorol> {
        const g = await supabase
            .from('autorole_config')
            .select('*, autoroles_roles (*)')
            .eq('guild', guildId)
            .eq('name', group)
        const config = g.data?.[0]
        if (!config) throw new Error('Group not found')
        return {
            ...config,
            roles: config.autoroles_roles.map(i => i.role),
        }
    }

    async getAll (): Promise<autorol[]> {
        const g = await supabase
            .from('autorole_config')
            .select('*, autoroles_roles (*)')
        const configs = g.data
        if (!configs) throw new Error('Groups not found')
        return configs.map(c => ({
            ...c,
            roles: c.autoroles_roles.map(i => i.role),
        }))
    }

    async getGuild (guildId: string): Promise<autorol[]> {
        const g = await supabase
            .from('autorole_config')
            .select('*, autoroles_roles (*)')
            .eq('guild', guildId)
        const configs = g.data
        if (!configs) throw new Error('Groups not found')
        return configs.map(c => ({
            ...c,
            roles: c.autoroles_roles.map(i => i.role),
        }))
    }
}
