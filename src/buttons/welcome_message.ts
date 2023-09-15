import { ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle } from 'offdjs/djs'

export async function handler (interaction: ButtonInteraction) {
    void interaction.showModal(new ModalBuilder()
        .setCustomId('config:welcome:message')
        .setTitle('Configurar mensaje de bienvenida')
        .setComponents(
            new ActionRowBuilder<TextInputBuilder>().setComponents(
                new TextInputBuilder()
                    .setCustomId('message')
                    .setLabel('Mensaje')
                    .setRequired(true)
                    .setPlaceholder('Bienvenido {member} a {guild}')
                    .setStyle(TextInputStyle.Paragraph)
                    .setValue('Bienvenido {member} a {guild}'),
            ),
        ),
    )
}

export const name = /config:welcome:message/
