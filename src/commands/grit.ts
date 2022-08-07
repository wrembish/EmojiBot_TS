import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

export const command : Command = new Command(
    'grit',
    'grit',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const { grit } = require('../emojibot_files/builtInMessages.json')
        if(grit) await interaction.reply(grit)
        else await interaction.reply('Something went wrong')
    }
)