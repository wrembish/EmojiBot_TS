import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

export const command : Command = new Command(
    'ahhh',
    'ahhh',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const { ahhh } = require('../emojibot_files/builtInMessages.json')
        if(ahhh) await interaction.reply(ahhh)
        else await interaction.reply('Something went wrong')
    }
)