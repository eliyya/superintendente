import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder, SlashCommandStringOption } from 'offdjs/djs'

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
