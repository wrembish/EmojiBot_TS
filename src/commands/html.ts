import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

export const command : Command = new Command(
    'html',
    'HTML',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const { salesforce } = require('../index.ts')
        await salesforce.checkAuth()
        const result : any = salesforce.doPost('services/apexrest/Convert', { 'StrToConvert' : 'I can teach you HTML (How to meet ladies)' })
        await interaction.reply(result)
    }
)