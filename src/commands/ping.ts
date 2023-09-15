import { ChatInputCommandInteraction } from 'offdjs/djs'

export async function handler (interaction: ChatInputCommandInteraction) {
    void interaction.reply('pong!')
}

export const name = 'ping'
