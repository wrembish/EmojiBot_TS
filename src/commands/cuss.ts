import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'
import { DATABASEERRORMESSAGE } from '../emojibot_files/constants'

export const command : Command = new Command(
    'cuss',
    'cuss',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const { builtInMessages } = require('../index')
        const replyStr : string | undefined = builtInMessages.get('cuss')
        if (replyStr) await interaction.reply(replyStr)
        else await interaction.reply({ content : DATABASEERRORMESSAGE, ephemeral : true }) 
    }
)