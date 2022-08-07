import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

export const command : Command = new Command(
    'jawn',
    'jawn',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const { jawn } = require('../emojibot_files/builtInMessages.json')
        if(jawn) await interaction.reply(jawn)
        else await interaction.reply('Something went wrong')
    }
)