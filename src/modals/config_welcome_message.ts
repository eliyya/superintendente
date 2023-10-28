import { ModalSubmitInteraction } from 'offdjs/djs'
import { welcomeController } from '#controller'
import { createSelectWelcomeChannel, createWelcomeConfigEmbed } from '../commands/config.js'

export async function handler (ctx: ModalSubmitInteraction) {
    if (!ctx.inCachedGuild()) return
    if (!ctx.isFromMessage()) return
    const message = ctx.fields.getTextInputValue('message')
    const config = await welcomeController.update(ctx.guildId, {
        message,
    })
    void ctx.update({
        embeds: [
            createWelcomeConfigEmbed(config),
        ],
        components: createSelectWelcomeChannel(),
    })
}

export const name = /config:welcome:message/
