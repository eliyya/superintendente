import { Database } from '../../database.types.js'

export type autorol = Database['public']['Tables']['autorole_config']['Row']

export interface iAutorolModel {
    create: (guildId: string, name: string) => Promise<autorol>
}
