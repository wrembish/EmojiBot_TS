import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

export const command : Command = new Command(
    'rough',
    'my first girlfriend turned into the moon',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const { salesforce } = require('../index.ts')
        await salesforce.checkAuth()
        const result : any = await salesforce.doPost('services/apexrest/Convert', { 'StrToConvert' : 'That\'s rough buddy' })
        await interaction.reply(result)
    }
)