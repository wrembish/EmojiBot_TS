import * as fs from 'node:fs'
import * as path from 'node:path'
import { REST, RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord.js'
import Command from './Command'

export default class DeployCommands {
    public static async deploy() : Promise<void> {
        if(process.env.TOKEN && process.env.CLIENT_ID) {
            const { salesforce } = require('../index.ts')
            await salesforce.checkAuth()
            const guildIds : string[] = []
            const result : any = await salesforce.query('SELECT+Name+FROM+GuildId__c')
            if(result.records) {
                for(const record of result.records) {
                    guildIds.push(record.Name)
                }
            }

            if(guildIds.length === 0) {
                const commands : RESTPostAPIApplicationCommandsJSONBody[] = []
                const commandsPath : fs.PathLike = path.join(__dirname, '..', 'commands')
                const commandFiles : string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'))

                for(const file of commandFiles) {
                    const filePath : string = path.join(commandsPath, file)
                    const command : Command = require(filePath).command
                    commands.push(command.data.toJSON())
                }

                for(const guildId of guildIds) {
                    const rest = new REST({ version : '10' }).setToken(process.env.TOKEN)
                    rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), { body : commands })
                        .then(() : void => console.log(`Successfully registered application commands for guild id ${guildId}!`))
                        .catch((error : any) : void => console.error('Error: ', error))
                }
            } else console.error('Error: No guilds to deploy commands to')
        } console.error('Error: Token/Client Id environment variable(s) are missing')
    }
}