import { iAutorolModel, autorol } from '../models/autorol/interface.js'

export class AutorolController implements iAutorolModel {
    autorolController: iAutorolModel
    constructor (welcomeConfigController: iAutorolModel) {
        this.autorolController = welcomeConfigController
    }

    async create (guildId: string, name: string): Promise<autorol> {
        return await this.autorolController.create(guildId, name)
    }

    async add (group: string, guild: string, role: string): Promise<autorol> {
        return await this.autorolController.add(group, guild, role)
    }

    async remove (group: string, guild: string, role: string): Promise<autorol> {
        return await this.autorolController.remove(group, guild, role)
    }

    async delete_ (guildId: string, group: string): Promise<void> {
        return await this.autorolController.delete_(guildId, group)
    }

    async get (guildId: string, group: string): Promise<autorol> {
        return await this.autorolController.get(guildId, group)
    }
}
