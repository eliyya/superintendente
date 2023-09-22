import { autorolController } from '#controller'
import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder, SlashCommandStringOption, SlashCommandSubcommandBuilder } from 'offdjs/djs'

export async function handler (ctx: ChatInputCommandInteraction) {
    if (ctx.options.getSubcommand() === 'create') return await create(ctx)
    if (ctx.options.getSubcommand() === 'add') return await add(ctx)
    if (ctx.options.getSubcommand() === 'remove') return await remove(ctx)
}

async function create (ctx: ChatInputCommandInteraction) {
    if (!ctx.inCachedGuild()) return
    const name = ctx.options.getString('name', true)
    const config = await autorolController.create(ctx.guildId, name)
    void ctx.reply({
        content: `Autorol ${config.name} created`,
    })
}

async function add (ctx: ChatInputCommandInteraction) {
    void ctx.reply('en desarrollo')
}

async function remove (ctx: ChatInputCommandInteraction) {
    void ctx.reply('en desarrollo')
}

export const command = new SlashCommandBuilder()
    .setName('autorol')
    .setDescription('Configuracion de Autoroles')
    .setDMPermission(false)
    .addSubcommand(
        new SlashCommandSubcommandBuilder()
            .setName('create')
            .setDescription('Crear un grupo de autoroles')
            .addStringOption(
                new SlashCommandStringOption()
                    .setName('name')
                    .setDescription('Nombre del grupo')
                    .setRequired(true),
            ),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
