import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'
import { DATABASEERRORMESSAGE } from '../emojibot_files/constants'
import { builtInMessages } from '../index'

export const command : Command = new Command(
    'cuss',
    'cuss',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const replyStr : string | undefined = builtInMessages.get('cuss')
        if (replyStr) await interaction.reply(replyStr)
        else await interaction.reply({ content : DATABASEERRORMESSAGE, ephemeral : true }) 
    }
)