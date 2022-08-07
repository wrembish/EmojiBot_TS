import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

export const command : Command = new Command(
    'emjoi',
    'close enough, I GUESS',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const { emjoi } = require('../emojibot_files/builtInMessages.json')
        if(emjoi) await interaction.reply(emjoi)
        else await interaction.reply('Something went wrong')
    }
)