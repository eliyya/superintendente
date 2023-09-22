import { Database } from '../../database.types.js'

export type welcome_config = Database['public']['Tables']['welcome_config']['Row']

export interface iWelcomeModel {
    get: (guildId: string) => Promise<welcome_config>
    update: (guildId: string, object: Partial<Omit<welcome_config, 'id'>>) => Promise<welcome_config>
}
