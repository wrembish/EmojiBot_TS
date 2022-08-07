import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

export const command : Command = new Command(
    'salesforce',
    'all my homies love salesforce',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const { sf } = require('../emojibot_files/builtInMessages.json')
        if(sf) await interaction.reply(sf)
        else await interaction.reply('Something went wrong')
    }
)