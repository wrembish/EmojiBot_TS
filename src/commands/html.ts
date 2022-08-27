import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'
import { convert } from '../classes/Helpers'

export const command : Command = new Command(
    'html',
    'HTML',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const convertedStr : string = convert('I can teach you HTML (How to meet ladies)')
        await interaction.reply(convertedStr)
    }
)