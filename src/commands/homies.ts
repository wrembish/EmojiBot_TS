import { ModalSubmitInteraction } from 'discord.js'
import { DATABASEERRORMESSAGE } from '../emojibot_files/constants'
import Command from '../classes/Command'
import { builtInMessages } from '../index'

export const command : Command = new Command(
    'kiss',
    'kissing the homies',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const replyStr : string | undefined = builtInMessages.get('homies')
        if (replyStr) await interaction.reply(replyStr)
        else await interaction.reply({ content : DATABASEERRORMESSAGE, ephemeral : true })
    }
)