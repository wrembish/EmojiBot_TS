import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

export const command : Command = new Command(
    'cuss',
    'cuss',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const { cuss } = require('../emojibot_files/builtInMessages.json')
        if(cuss) await interaction.reply(cuss)
        else await interaction.reply('Something went wrong')
    }
)