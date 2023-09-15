import { createSelectWelcomeChannel, createWelcomeConfigEmbed } from '../commands/config.js'
import { AnySelectMenuInteraction } from 'offdjs/djs'
import { supabase } from '../supabase.js'

export async function handler (interaction: AnySelectMenuInteraction) {
    if (!interaction.isChannelSelectMenu()) return
    if (!interaction.inCachedGuild()) return
    await interaction.deferReply({
        ephemeral: true,
    })
    const channel = interaction.channels.first()
    if (!channel) {
        // delete
        await supabase.from('guilds').upsert({
            id: interaction.guildId,
            welcome_channel: null,
        }).eq('id', interaction.guildId)
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
    await supabase.from('guilds').upsert({
        id: interaction.guildId,
        welcome_channel: channel.id,
    }).eq('id', interaction.guildId)
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
