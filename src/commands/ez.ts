import { ModalSubmitInteraction } from 'discord.js'
import { DATABASEERRORMESSAGE } from '../classes/Constants'
import Command from '../classes/Command'

export const command : Command = new Command(
    'ez',
    'ez',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const { builtInMessages } = require('../index')
        const replyStr : string | undefined = builtInMessages.get('ez')
        if (replyStr) await interaction.reply(replyStr)
        else await interaction.reply({ content : DATABASEERRORMESSAGE, ephemeral : true })
    }
)