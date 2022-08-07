import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

export const command : Command = new Command(
    'pog',
    'pog',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const { pog } = require('../emojibot_files/builtInMessages.json')
        if(pog) await interaction.reply(pog)
        else await interaction.reply('Something went wrong')
    }
)