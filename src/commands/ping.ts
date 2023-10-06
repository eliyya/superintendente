import { ChatInputCommandInteraction, SlashCommandBuilder } from 'offdjs/djs'

export async function handler (interaction: ChatInputCommandInteraction) {
    void interaction.reply('pong!')
}

export const command = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('ping')
