import { supabase } from 'src/supabase.js'
import { autorole_config, iAutoroleConfigModel } from './interface.js'
import { Collection } from 'offdjs/djs'

export class AutoroleConfigModel implements iAutoroleConfigModel {
    cache = new Collection<string, autorole_config>()

    async create (guildId: string, name: string): Promise<autorole_config> {
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
