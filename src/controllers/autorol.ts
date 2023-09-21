import { iAutorolModel, autorol } from '../models/autorol/interface.js'

export class AutorolController {
    autorolController: iAutorolModel
    constructor (welcomeConfigController: iAutorolModel) {
        this.autorolController = welcomeConfigController
    }

    async create (guildId: string, name: string): Promise<autorol> {
        return await this.autorolController.create(guildId, name)
    }
}
