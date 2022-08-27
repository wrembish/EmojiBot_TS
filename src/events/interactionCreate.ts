import { Interaction } from 'discord.js'
import Command from '../classes/Command'
import DiscordEvent from '../classes/DiscordEvent'
import { INTERACTIONERRORMESSAGE } from '../classes/Constants'
import { commands } from '../index'

export const event : DiscordEvent = new DiscordEvent(
    'interactionCreate',
    false,
    async (interaction : Interaction) : Promise<void> => {
        if(!interaction.isCommand()) return

        const command : Command | undefined = commands.get(interaction.commandName)

        if(command) {
            try {
                await command.execute(interaction)
            } catch(error : any) {
                console.error('Error: ', error)
                await interaction.reply({ content : INTERACTIONERRORMESSAGE, ephemeral : true })
            }
        }
    }
)