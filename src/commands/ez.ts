import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

export const command : Command = new Command(
    'ez',
    '3ez',
    async(interaction : ModalSubmitInteraction) : Promise<void> => {
        const { ez } = require('../emojibot_files/builtInMessages.json')
        if(ez) await interaction.reply(ez)
        else await interaction.reply('Something went wrong')
    }
)