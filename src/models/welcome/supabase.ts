import { Collection } from 'offdjs/djs'
import { iWelcomeModel, welcome_config } from './interface.js'
import { supabase } from '../../supabase.js'

export class WelcomeModel implements iWelcomeModel {
    cache = new Collection<string, welcome_config>()

    async get (guildId: string): Promise<welcome_config> {
        if (this.cache.has(guildId)) return this.cache.get(guildId) as welcome_config
        const req = await supabase.from('welcome_config').select().eq('id', guildId)
        const config = req.data?.[0] ?? { channel: null, message: null, id: guildId, background: null }
        return config
    }

    async update (guildId: string, object: Partial<Omit<welcome_config, 'id'>>): Promise<welcome_config> {
        const req = await supabase.from('welcome_config').upsert({
            ...object,
            id: guildId,
        }).select()
        this.cache.set(guildId, req.data?.[0] as welcome_config)
        return req.data?.[0] as welcome_config
    }
}
