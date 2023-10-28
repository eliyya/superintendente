import { ChatInputCommandInteraction, SlashCommandBuilder } from 'offdjs/djs'

export async function handler (ctx: ChatInputCommandInteraction) {
    void ctx.reply('pong!')
}

export const command = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('ping')
