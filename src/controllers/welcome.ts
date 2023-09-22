import { iWelcomeModel, welcome_config } from '../models/welcome/interface.js'

export class WelcomeController {
    welcomeController: iWelcomeModel
    constructor (welcomeConfigController: iWelcomeModel) {
        this.welcomeController = welcomeConfigController
    }

    async get (guildId: string) {
        return await this.welcomeController.get(guildId)
    }

    async update (guildId: string, object: Partial<Omit<welcome_config, 'id'>>) {
        return await this.welcomeController.update(guildId, object)
    }
}
