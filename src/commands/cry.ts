import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

export const command : Command = new Command(
    'cry',
    'a weekly occurance',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const { salesforce } = require('../index.ts')
        await salesforce.checkAuth()
        const result : any = await salesforce.doPost('services/apexrest/Convert', { 'StrToConvert' : 'time to cry boys' })
        await interaction.reply(`:cry: ${result} :cry:`)
    }
)