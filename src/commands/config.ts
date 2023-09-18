import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelSelectMenuBuilder, ChannelType, ChatInputCommandInteraction, EmbedBuilder } from 'offdjs/djs'
import { welcomeConfigController } from '#controller'
import { welcome_config } from 'src/models/welcome_config/interface.js'

export async function handler (interaction: ChatInputCommandInteraction) {
    if (!interaction.inCachedGuild()) return
    await interaction.deferReply()
    const config = await welcomeConfigController.get(interaction.guildId)
    // TODO: check if the bot can send messages or delete config
    void interaction.editReply({
        embeds: [
            createWelcomeConfigEmbed(config),
        ],
        components: createSelectWelcomeChannel(),
    })
}

export const name = 'config'

export function createWelcomeConfigEmbed (config: Omit<welcome_config, 'id'>) {
    return new EmbedBuilder()
        .setTitle('Configuracion de bienvenida')
        .setFields({
            name: 'Canal',
            value: config.channel ? `<#${config.channel}>` : 'none',
        }, {
            name: 'Mensaje',
            value: config.message ?? 'Bienvenido {member} a {guild}',
        })
        .setDescription(`Puede establecer o cambiar el canal en el menu de abajo
Las variables para el mensaje pueden ser {member} y {guild}`,
        )
        .setImage(config.background ?? 'https://cdn.discordapp.com/attachments/1153183774473981952/1153184007341756416/background.png')
}

export function createSelectWelcomeChannel () {
    return [
        new ActionRowBuilder<ChannelSelectMenuBuilder>()
            .setComponents(
                new ChannelSelectMenuBuilder()
                    .setCustomId('config:welcome')
                    .setMinValues(0)
                    .setMaxValues(1)
                    .setChannelTypes(ChannelType.GuildText)
                    .setPlaceholder('Selecciona un canal'),
            ),
        new ActionRowBuilder<ButtonBuilder>()
            .setComponents(
                new ButtonBuilder()
                    .setCustomId('config:welcome:message')
                    .setLabel('Cambiar mensaje')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('config:welcome:background')
                    .setLabel('Cambiar background')
                    .setStyle(ButtonStyle.Primary),
            ),
    ]
}
