import { ActionRowBuilder, ChatInputCommandInteraction, ModalBuilder, PermissionFlagsBits, SlashCommandBuilder, SlashCommandStringOption, TextInputBuilder, TextInputStyle } from 'offdjs/djs'

export async function handler (ctx: ChatInputCommandInteraction) {
    if (!ctx.inCachedGuild()) return
    const message = ctx.options.getString('message')
    if (message) {
        try {
            await ctx.channel?.send(message)
            void ctx.reply({
                content: 'message sent',
                ephemeral: true,
            })
        } catch (error) {
            void ctx.reply({
                content: (error as Error).message,
                ephemeral: true,
            })
        }
    } else {
        await ctx.showModal(
            new ModalBuilder()
                .setCustomId('say')
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                .setTitle(`${ctx.client.user} say`)
                .setComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .setComponents(
                            new TextInputBuilder()
                                .setCustomId('content')
                                .setLabel('Message')
                                .setPlaceholder('Hello everyone')
                                .setStyle(TextInputStyle.Paragraph),
                        ),
                ),
        )
    }
}

export const command = new SlashCommandBuilder()
    .setName('say')
    .setDescription('Send messages with the bot')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addStringOption(
        new SlashCommandStringOption()
            .setName('message')
            .setDescription('Simple text message to send')
            .setRequired(false),
    )
