import { autorolController } from '#controller'
import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder, SlashCommandRoleOption, SlashCommandStringOption, SlashCommandSubcommandBuilder } from 'offdjs/djs'

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
    if (!ctx.inCachedGuild()) return
    const group = ctx.options.getString('group', true)
    const role = ctx.options.getRole('role', true)
    try {
        await autorolController.add(group, ctx.guildId, role.id)
        void ctx.reply({
            content: `Rol ${role.name} added to ${group} group`,
        })
    } catch (error) {
        if ((error as Error).message === 'Group not found') {
            void ctx.reply({
                content: `Group ${group} not found`,
            })
        }
    }
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
    .addSubcommand(
        new SlashCommandSubcommandBuilder()
            .setName('add')
            .setDescription('Crear un grupo de autoroles')
            .addStringOption(
                new SlashCommandStringOption()
                    .setName('group')
                    .setDescription('Nombre del grupo')
                    .setRequired(true),
            )
            .addRoleOption(
                new SlashCommandRoleOption()
                    .setName('role')
                    .setDescription('Nombre del grupo')
                    .setRequired(true),
            ),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
