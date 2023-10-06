import { autorolController } from '#controller'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalSubmitInteraction } from 'offdjs/djs'

export async function handler (ctx: ModalSubmitInteraction) {
    if (!ctx.inCachedGuild()) return
    const id = ctx.id.split(':').at(-1)
    if (!id) return
    const config = await autorolController.get(ctx.guildId, id)
    if (!config) {
        return await ctx.reply({
            content: 'Grupo no encontrado',
        })
    }
    const content = ctx.fields.getTextInputValue('content')
    const channel = ctx.channel
    if (!channel) return
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
    void channel.send({
        content,
        components,
    })
    return await ctx.reply({
        ephemeral: true,
        content: 'desplegado',
    })
}
