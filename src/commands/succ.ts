import { ModalSubmitInteraction } from 'discord.js'
import { DATABASEERRORMESSAGE } from '../emojibot_files/constants'
import Command from '../classes/Command'

export const command : Command = new Command(
    'succ',
    'lmao',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const { builtInMessages } = require('../index')
        const replyStr : string | undefined = builtInMessages.get('succ')
        if (replyStr) await interaction.reply(replyStr)
        else await interaction.reply({ content : DATABASEERRORMESSAGE, ephemeral : true })
    }
)