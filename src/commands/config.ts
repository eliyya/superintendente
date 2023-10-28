import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelSelectMenuBuilder, ChannelType, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from 'offdjs/djs'
import { welcomeController } from '#controller'
import { welcome_config } from 'src/models/welcome/interface.js'

export async function handler (ctx: ChatInputCommandInteraction) {
    if (!ctx.inCachedGuild()) return
    await ctx.deferReply()
    const config = await welcomeController.get(ctx.guildId)
    // TODO: check if the bot can send messages or delete config
    void ctx.editReply({
        embeds: [
            createWelcomeConfigEmbed(config),
        ],
        components: createSelectWelcomeChannel(),
    })
}

export const command = new SlashCommandBuilder()
    .setName('config')
    .setDescription('Configuracion del bot')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

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
