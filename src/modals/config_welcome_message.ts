import { ModalSubmitInteraction } from 'offdjs/djs'
import { welcomeConfigController } from '#controller'
import { createSelectWelcomeChannel, createWelcomeConfigEmbed } from '../commands/config.js'

export async function handler (interaction: ModalSubmitInteraction) {
    if (!interaction.inCachedGuild()) return
    if (!interaction.isFromMessage()) return
    const message = interaction.fields.getTextInputValue('message')
    const config = await welcomeConfigController.update(interaction.guildId, {
        message,
    })
    void interaction.update({
        embeds: [
            createWelcomeConfigEmbed(config),
        ],
        components: createSelectWelcomeChannel(),
    })
}

export const name = /config:welcome:message/
