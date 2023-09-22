import { Database } from '../../database.types.js'

export type autorol_db = Database['public']['Tables']['autorole_config']['Row']
export type roles = Database['public']['Tables']['autoroles_roles']['Row']
export type autorol = autorol_db & { roles: string[] }

export interface iAutorolModel {
    create: (guildId: string, name: string) => Promise<autorol>
    add: (group: string, guild: string, role: string) => Promise<autorol>
}
