import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'
import { convert } from '../classes/Helpers'

export const command : Command = new Command(
    'rough',
    'my first girlfriend turned into the moon',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const convertedStr : string = convert('That\'s rough buddy')
        await interaction.reply(convertedStr)
    }
)