import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

export const command : Command = new Command(
    'server',
    'Replies with server infor!',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        if(interaction.guild) await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`)
        else await interaction.reply('Something went wrong. Make sure you are using this command from a server, not DMs.')
    }
)