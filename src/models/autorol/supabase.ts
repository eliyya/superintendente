import { supabase } from '../../supabase.js'
import { autorol, iAutorolModel } from './interface.js'
import { Collection } from 'offdjs/djs'

export class AutoroleModel implements iAutorolModel {
    cache = new Collection<string, autorol>()

    async create (guildId: string, name: string): Promise<autorol> {
        const req = await supabase.from('autorole_config').insert({
            guild: guildId,
            name,
        }).single()
        const config = req.data?.[0]
        if (config) {
            this.cache.set(guildId, config)
            return config
        } else throw new Error('No se pudo crear la configuración')
    }
}
