import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'
import * as fs from 'node:fs'
import * as path from 'node:path'
import DeployCommands from '../classes/DeployCommands'

export const command : Command = new Command(
    'update',
    'Update Slash Commands',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        if(interaction.user.id === process.env.ADMIN) {
            try {
                await DeployCommands.deploy()
                const { COMMANDS } = require('../index.ts')
                COMMANDS.clear()
                const commandsPath : fs.PathLike = path.join(__dirname, '..', 'commands')
                const commandFiles : string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'))

                for(const file of commandFiles) {
                    const filePath : string = path.join(commandsPath, file)
                    const command : Command = require(filePath).command
                    COMMANDS.set(command.data.name, command)
                }

                const { succ } = require('../emojibot_files/builtInMessages.json')
                await interaction.reply(`${succ} cess`)
            } catch(error : any) {
                console.error('Error: ', error)
                await interaction.reply('There was an error when trying to update the commands')
            }
        } else await interaction.reply('You do not have permission to use this command')
    }
)