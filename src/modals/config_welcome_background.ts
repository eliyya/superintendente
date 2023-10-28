import { ModalSubmitInteraction } from 'offdjs/djs'
import { welcomeController } from '#controller'
import { createSelectWelcomeChannel, createWelcomeConfigEmbed } from '../commands/config.js'
import { loadImage } from 'canvas'

export async function handler (ctx: ModalSubmitInteraction) {
    if (!ctx.inCachedGuild()) return
    if (!ctx.isFromMessage()) return
    const background = ctx.fields.getTextInputValue('background')
    if (!isURL(background)) {
        return await ctx.reply({
            content: 'Se necesita una URL',
            ephemeral: true,
        })
    }
    if (!await isImmage(background)) {
        return await ctx.reply({
            content: 'Se necesita una imagen',
            ephemeral: true,
        })
    }
    const config = await welcomeController.update(ctx.guildId, {
        background,
    })
    return await ctx.update({
        embeds: [
            createWelcomeConfigEmbed(config),
        ],
        components: createSelectWelcomeChannel(),
    })
}

export const name = /config:welcome:message/

function isURL (url: string) {
    try {
        return !!new URL(url)
    } catch (error) {
        return !1
    }
}

async function isImmage (url: string) {
    try {
        return !!await loadImage(url)
    } catch (error) {
        return !1
    }
}
