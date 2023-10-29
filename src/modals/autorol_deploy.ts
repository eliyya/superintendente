import { autorolController } from '#controller'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalSubmitInteraction } from 'offdjs/djs'
import { autorol } from 'src/models/autorol/interface.js'

export async function handler (ctx: ModalSubmitInteraction) {
    if (!ctx.inCachedGuild()) return
    const id = ctx.id.split(':').at(-1)
    if (!id) return
    let config: autorol
    try {
        config = await autorolController.get(ctx.guildId, id)
    } catch (error) {
        return await ctx.reply({
            content: 'Grupo no encontrado',
        })
    }
    const content = ctx.fields.getTextInputValue('content')
    if (!ctx.channel) return
    const components: Array<ActionRowBuilder<ButtonBuilder>> = []
    let i = 0
    for (const r of config.roles) {
        const role = await ctx.guild.roles.fetch(r)
        if (!role) {
            void autorolController.remove(config.name, ctx.guildId, r)
            continue
        }
        components[i] ??= new ActionRowBuilder<ButtonBuilder>()
        if (components[i].components.length > 5) {
            components[++i] ??= new ActionRowBuilder<ButtonBuilder>()
        }
        components[i].addComponents(
            new ButtonBuilder()
                .setCustomId(`autorol:${r}`)
                .setLabel(role.name)
                .setStyle(ButtonStyle.Primary),
        )
    }
    void ctx.channel.send({
        content,
        components,
    })
    return await ctx.reply({
        ephemeral: true,
        content: 'desplegado',
    })
}

export const name = /^autorol:deploy:[^:]*$/
