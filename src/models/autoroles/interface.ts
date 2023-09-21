import { Database } from '../../database.types.js'

export type autorole_config = Database['public']['Tables']['autorole_config']['Row']

export interface iAutoroleConfigModel {
    create: (guildId: string, name: string) => Promise<autorole_config>
}
