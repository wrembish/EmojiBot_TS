import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

export const command : Command = new Command(
    'succ',
    'lmao',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const { succ } = require('../emojibot_files/builtInMessages.json')
        if(succ) await interaction.reply(succ)
        else await interaction.reply('Something went wrong')
    }
)