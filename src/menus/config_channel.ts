import { createSelectWelcomeChannel, createWelcomeConfigEmbed } from '../commands/config.js'
import { AnySelectMenuInteraction } from 'offdjs/djs'
import { welcomeConfigController } from '#controller'
export async function handler (interaction: AnySelectMenuInteraction) {
    if (!interaction.isChannelSelectMenu()) return
    if (!interaction.inCachedGuild()) return
    await interaction.deferReply({
        ephemeral: true,
    })
    const channel = interaction.channels.first()
    if (!channel) {
        // delete
        await welcomeConfigController.update(interaction.guildId, { channel: null })
        await interaction.message.edit({
            embeds: [
                createWelcomeConfigEmbed(null),
            ],
            components: [
                createSelectWelcomeChannel(),
            ],
        })
        return await interaction.editReply('Configuracion actualizada')
    }
    await welcomeConfigController.update(interaction.guildId, { channel: channel.id })
    await interaction.message.edit({
        embeds: [
            createWelcomeConfigEmbed(channel.id),
        ],
        components: [
            createSelectWelcomeChannel(),
        ],
    })
    return await interaction.editReply('Configuracion actualizada')
}

export const name = /config:welcome/
