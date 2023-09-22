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
}
