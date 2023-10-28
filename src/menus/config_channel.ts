import { createSelectWelcomeChannel, createWelcomeConfigEmbed } from '../commands/config.js'
import { AnySelectMenuInteraction } from 'offdjs/djs'
import { welcomeController } from '#controller'

export async function handler (ctx: AnySelectMenuInteraction) {
    if (!ctx.isChannelSelectMenu()) return
    if (!ctx.inCachedGuild()) return
    await ctx.deferReply({
        ephemeral: true,
    })
    const channel = ctx.channels.first()
    if (!channel) {
        // delete
        const config = await welcomeController.update(ctx.guildId, { channel: null })
        await ctx.message.edit({
            embeds: [
                createWelcomeConfigEmbed(config),
            ],
            components: createSelectWelcomeChannel(),
        })
        return await ctx.editReply('Configuracion actualizada')
    }
    const config = await welcomeController.update(ctx.guildId, { channel: channel.id })
    await ctx.message.edit({
        embeds: [
            createWelcomeConfigEmbed(config),
        ],
        components: createSelectWelcomeChannel(),
    })
    return await ctx.editReply('Configuracion actualizada')
}

export const name = /config:welcome/
