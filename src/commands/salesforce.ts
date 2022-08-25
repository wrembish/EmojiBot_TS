import { ModalSubmitInteraction } from 'discord.js'
import { DATABASEERRORMESSAGE } from '../emojibot_files/constants'
import Command from '../classes/Command'
import { builtInMessages } from '../index'

export const command : Command = new Command(
    'salesforce',
    'all my homies love salesforce',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const replyStr : string | undefined = builtInMessages.get('sf')
        if (replyStr) await interaction.reply(replyStr)
        else await interaction.reply({ content : DATABASEERRORMESSAGE, ephemeral : true })
    }
)