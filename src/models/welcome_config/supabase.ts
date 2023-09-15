import { Collection } from 'offdjs/djs'
import { createClient } from '@supabase/supabase-js'
import { Database } from '../../database.types.js'

const supabase = createClient<Database>(process.env.SUPABASE_URL as string, process.env.SERVICE_KEY as string)
type welcome_config = Database['public']['Tables']['welcome_config']['Row']

export class WelcomeConfigModel {
    static cache = new Collection<string, welcome_config>()

    static async get (guildId: string): Promise<welcome_config> {
        if (this.cache.has(guildId)) return this.cache.get(guildId) as welcome_config
        const req = await supabase.from('welcome_config').select().eq('id', guildId)
        const config = req.data?.[0] ?? { channel: null, message: null, id: guildId }
        return config
    }

    static async update (guildId: string, object: Partial<Omit<welcome_config, 'id'>>): Promise<welcome_config> {
        const req = await supabase.from('welcome_config').upsert({
            ...object,
            id: guildId,
        }).select()
        this.cache.set(guildId, req.data?.[0] as welcome_config)
        return req.data?.[0] as welcome_config
    }
}
