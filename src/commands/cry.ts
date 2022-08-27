import { ModalSubmitInteraction } from 'discord.js'
import { convert } from '../classes/Helpers'
import Command from '../classes/Command'

export const command : Command = new Command(
    'cry',
    'a weekly occurance',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const convertedStr : string = convert('time to cry boys')

        await interaction.reply(`:cry:   ${convertedStr}   :cry:`)
    }
)