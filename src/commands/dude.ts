import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

export const command : Command = new Command(
    'dude',
    'lmao',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const { dude } = require('../emojibot_files/builtInMessages.json')
        if(dude) await interaction.reply(dude)
        else await interaction.reply('Something went wrong')
    }
)