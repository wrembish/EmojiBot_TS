import { Collection, ModalSubmitInteraction } from 'discord.js'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { DATABASEERRORMESSAGE } from '../emojibot_files/constants'
import { deployCommands } from '../emojibot_files/helpers'
import Command from '../classes/Command'

export const command : Command = new Command(
    'update',
    'Update Slash Commands',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        // Only let the set admin run this command
        if(process.env.ADMIN && interaction.user.id === process.env.ADMIN) {
            const { commands, builtInMessages } = require('../index')
            try {
                await deployCommands()

                commands.clear()

                const commandsPath : fs.PathLike = path.join(__dirname, '..', 'commands')
                const commandFiles : string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'))

                for(const file of commandFiles) {
                    const filePath : string = path.join(commandsPath, file)
                    const { command } = require(filePath)
                    commands.set(command.data.name, command)
                }

                const replyStr : string | undefined = builtInMessages.get('succ')
                if (replyStr) await interaction.reply(`${replyStr}  cess`)
                else await interaction.reply({ content : DATABASEERRORMESSAGE, ephemeral : true })
            } catch(error : any) {
                console.error('Error: ', error)
                await interaction.reply({ content : 'There was an error when trying to update the commands', ephemeral : true })
            }
        }
    }
)