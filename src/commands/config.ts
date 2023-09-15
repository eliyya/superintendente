import { ActionRowBuilder, ChannelSelectMenuBuilder, ChannelType, ChatInputCommandInteraction, EmbedBuilder } from 'offdjs/djs'
import { welcomeConfigController } from '#controller'

export async function handler (interaction: ChatInputCommandInteraction) {
    if (!interaction.inCachedGuild()) return
    await interaction.deferReply()
    const config = await welcomeConfigController.get(interaction.guildId)
    // TODO: check if the bot can send messages or delete config
    void interaction.editReply({
        embeds: [
            createWelcomeConfigEmbed(config.channel),
        ],
        components: [
            createSelectWelcomeChannel(),
        ],
    })
}

export const name = 'config'

export function createWelcomeConfigEmbed (channel?: string | null) {
    return new EmbedBuilder()
        .setTitle('Configuracion de bienvenida')
        .setFields({
            name: 'Canal establecido',
            value: channel ? `<#${channel}>` : 'none',
        })
        .setDescription('Puede establecer o cambiar el canal en el menu de abajo')
}

export function createSelectWelcomeChannel () {
    return new ActionRowBuilder<ChannelSelectMenuBuilder>()
        .setComponents(
            new ChannelSelectMenuBuilder()
                .setCustomId('config:welcome')
                .setMinValues(0)
                .setMaxValues(1)
                .setChannelTypes(ChannelType.GuildText)
                .setPlaceholder('Selecciona un canal'),
        )
}
