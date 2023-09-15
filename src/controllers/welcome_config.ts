import { Database } from '../database.types.js'
import { iWelcomeConfigModel } from '../models/welcome_config/interface.js'

type welcome_config = Database['public']['Tables']['welcome_config']['Row']

export class WelcomeConfigController {
    welcomeConfigController: iWelcomeConfigModel
    constructor (welcomeConfigController: iWelcomeConfigModel) {
        this.welcomeConfigController = welcomeConfigController
    }

    async get (guildId: string) {
        return await this.welcomeConfigController.get(guildId)
    }

    async update (guildId: string, object: Partial<Omit<welcome_config, 'id'>>) {
        return await this.welcomeConfigController.update(guildId, object)
    }
}
