import { ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle } from 'offdjs/djs'

export async function handler (interaction: ButtonInteraction) {
    void interaction.showModal(new ModalBuilder()
        .setCustomId('config:welcome:background')
        .setTitle('Configurar background')
        .setComponents(
            new ActionRowBuilder<TextInputBuilder>().setComponents(
                new TextInputBuilder()
                    .setCustomId('background')
                    .setLabel('Background')
                    .setRequired(true)
                    .setPlaceholder('https://cdn.discordapp.com/attachments/1153183774473981952/1153184007341756416/background.png')
                    .setStyle(TextInputStyle.Short)
                    .setValue('https://cdn.discordapp.com/attachments/1153183774473981952/1153184007341756416/background.png'),
            ),
        ),
    )
}

export const name = /config:welcome:background/
