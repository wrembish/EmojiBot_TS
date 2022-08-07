import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

export const command : Command = new Command(
    'kiss',
    'kissing the homies',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const { homies } = require('../emojibot_files/builtInMessages.json')
        if(homies) await interaction.reply(homies)
        else await interaction.reply('Something went wrong')
    }
)