import { Database } from '../../database.types.js'

export type autorol_db = Database['public']['Tables']['autorole_config']['Row']
export type roles = Database['public']['Tables']['autoroles_roles']['Row']
export type autorol = autorol_db & { roles: string[] }

export interface iAutorolModel {
    add: (group: string, guild: string, role: string) => Promise<autorol>
    remove: (group: string, guild: string, role: string) => Promise<autorol>
    create: (guildId: string, name: string) => Promise<autorol>
    delete_: (id: number) => Promise<void>
    find: (guildId: string, groupName: string) => Promise<autorol>
    get: (id: string) => Promise<autorol>
    getAll: () => Promise<autorol[]>
    getGuild: (guildId: string) => Promise<autorol[]>
}
