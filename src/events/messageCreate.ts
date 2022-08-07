import { Message } from 'discord.js'
import Event__c from '../classes/Event__c'

const emoji : string = '!emoji'

export const event : Event__c = new Event__c(
    'messageCreate',
    false,
    async (message : Message) : Promise<void> => {
        let { salesforce } = require('../index.ts')
        await salesforce.checkAuth()
        const guildIds : string[] = []
        const result : any = await salesforce.query('SELECT+Name+FROM+GuildId__c')
        if(result.records) {
            for(const record of result.records) {
                guildIds.push(record.Name)
            }
        }

        if(guildIds.length !== 0 && message.guildId && !guildIds.includes(message.guildId)) {
            const result : any = await salesforce.insert('GuildId__c', { Name : message.guildId })
            if(result.hasOwnProperty('id')) console.log(`Successfully added ${message.guild?.name} to the list of Servers`)
            else console.error('Error: ', result)
        }

        if(message.client.user && message.client.user.id === message.author.id) return

        const content : string = message.content

        if(content.startsWith(emoji)) {
            const contentMessage : string = content.substring(emoji.length)
            if(contentMessage.length !== 0) {
                const result : any = await salesforce.doPost('services/apexrest/Convert', { 'StrToConvert' : contentMessage })
                await message.channel.send(result)
            }
        } else if(content.includes('/grit')) {
            const { grit } = require('../emojibot_files/builtInMessages.json')
            if(grit) await message.channel.send(grit)
            else await message.channel.send('Something went wrong')
        } else if(content.toUpperCase().includes('SUCK')) {
            const { succ } = require('../emojibot_files/builtInMessages.json')
            if(succ) await message.channel.send(succ)
            else await message.channel.send('Something went wrong')
        } else if(content === '69' || content.startsWith('69 ') || content.endsWith(' 69') || content.includes(' 69 ')) {
            await salesforce.checkAuth()
            const result : any = await salesforce.doPost('services/apexrest/Convert', { 'StrToConvert' : '69? nice' })
            await message.channel.send(result)
        } else if(content === '420' || content.startsWith('420 ') || content.endsWith(' 420') || content.includes(' 420 ')) {
            await salesforce.checkAuth()
            const result : any = await salesforce.doPost('services/apexrest/Convert', { 'StrToConvert' : '420? nice' })
            await message.channel.send(result)
        } else if(content.includes('/oof') || content.includes('/bigoof')) {
            const { big_oof } = require('../emojibot_files/builtInMessages.json')
            if(big_oof) await message.channel.send(big_oof)
            else await message.channel.send('Something went wrong')
        }
    }
)