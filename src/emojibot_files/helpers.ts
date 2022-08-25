import * as fs from 'node:fs'
import * as path from 'node:path'
import { EmbedBuilder, Message, REST } from 'discord.js'
import { Collection as MongoCollection } from 'mongodb'
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord-api-types/v10'
import { conversionMap, cronJobs } from '../index'
import { EMBEDCOLOR } from './constants'

/**
 * Converts the given string into a string of emojis
 * @param {Object} map the conversion object that maps chars to emojis
 * @param {string} str the string to convert
 * @returns the converted string of emojis
 */
export function convert(str: string): string {
    let output: string = ''
    for (const c of str.split('')) {
        if (c === ' ') output += '     '
        else output += conversionMap[c.toUpperCase()][Math.floor(Math.random() * conversionMap[c.toUpperCase()].length)] + ' '
    }

    return output
}

/**
 * Deploys the commands from the commands directory to the bot as application commands
 */
export async function deployCommands(): Promise<void> {
    const commands: RESTPostAPIApplicationCommandsJSONBody[] = []
    const commandsPath: fs.PathLike = path.join(__dirname, '..', 'commands')
    const commandFiles: string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

    for (const file of commandFiles) {
        const filePath: string = path.join(commandsPath, file)
        const { command } = require(filePath)
        commands.push(command.data.toJSON())
    }
    if (process.env.TOKEN && process.env.CLIENT_ID) {
        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

        rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
            .then((): void => console.log('Successfully registered application commands!'))
            .catch((error: any): void => console.error('Error: ', error))
    }
}

/**
 * Converts a string in the format HH:MMAM / HH:MMPM to a cron string
 * @param {string} timeStr the time string in the form of HH:MMAM / HH:MMPM
 * @returns a cron string in the form of MM HH * * *
 */
export function buildCronStr(timeStr: string): string {
    let output: string = ''
    const timeOfDay: string = timeStr.endsWith('AM') ? 'AM' : 'PM'
    const timeSplit: string[] = timeStr.substring(0, timeStr.length - 2).split(':')

    output += timeSplit[1] + ' '

    if (timeSplit[0] == '12' && timeOfDay == 'AM') output += '0 '
    else if (timeSplit[0] == '12' && timeOfDay == 'PM') output += '12 '
    else if (timeOfDay == 'PM') output += (12 + parseInt(timeSplit[0])).toString() + ' '
    else output += timeSplit[0] + ' '

    output += '* * *'

    return output
}

/**
 * Creates an embed for discord messages with a random dog fact
 * and a random dog image
 *
 * Credit : http://dog-api.kinduff.com => random dog fact
 * Credit : https://dog.ceo => random dog image
 *
 * @returns an EmbedBuilder object with a random dog fact and image
 */
export async function getDogFactsEmbed(): Promise<any> {
    // Get a random dog fact from http://dog-api.kinduff.com
    let factResult: any
    await fetch('http://dog-api.kinduff.com/api/facts')
        .then((response: Response): any => response.json())
        .then((data: any): void => factResult = data)
        .catch((error: any): void => console.error('Error: ', error))

    // Get a random dog image from https://dog.ceo
    let imageResult: any
    await fetch('https://dog.ceo/api/breeds/image/random')
        .then((response: Response): any => response.json())
        .then((data: any): void => imageResult = data)
        .catch((error: any): void => console.error('Error: ', error))

    // Build the embed to return
    const resultEmbed: EmbedBuilder = new EmbedBuilder()
        .setTitle('**__Daily Dog Fact__**')
        .setDescription(factResult.facts[0])
        .setColor(EMBEDCOLOR)
        .setImage(imageResult.message)

    return resultEmbed
}

/**
 * Creates an embed for discord messages with a random cat fact
 * and a random cat image
 *
 * Credit : https://meowfacts.herokuapp.com/ => random cat fact
 * Credit : https://cataas.com => random cat image
 *
 * @returns an EmbedBuilder object with a random cat fact and image
 */
export async function getCatFactsEmbed(): Promise<any> {
    // Get a random cat fact from https://meowfacts.herokuapp.com/
    let factResult: any
    await fetch('https://meowfacts.herokuapp.com/')
        .then((response: Response): any => response.json())
        .then((data: any): void => factResult = data)
        .catch((error: any): void => console.error('Error: ', error))

    // Get a random cat image from the cats as a service api
    let imageResult: any
    await fetch('https://cataas.com/cat?json=true')
        .then((response: Response): any => response.json())
        .then((data: any): void => imageResult = data)
        .catch((error: any): void => console.error('Error: ', error))

    // Build the embed to return
    const resultEmbed: EmbedBuilder = new EmbedBuilder()
        .setTitle('**__Daily Cat Fact__**')
        .setDescription(factResult.data[0])
        .setColor(EMBEDCOLOR)
        .setImage(`https://cataas.com${imageResult.url}`)

    return resultEmbed
}

/**
 * Will remove the cron job (if it exists) that corresponds to
 * the message channel and the jobName from the client list of
 * jobs as well as delete it from the MongoDB collection
 * @param {Message} message The Discord Message object
 * @param {Collection} collection The MongoDB Collection object
 * @param {string} jobName The name of the job you wish to delete
 * @returns true if a job is deleted, false otherwise
 */
export async function deleteCronJob(message: Message, collection: MongoCollection | undefined, jobName: string): Promise<boolean> {
    let index : number | undefined = undefined
    for (let i : number = 0; i < cronJobs.length; ++i) {
        const job = cronJobs[i]
        if (job.channel === message.channelId && job.job === jobName) {
            index = i
            job.cronJob.stop()
            await collection?.deleteOne({ _id: job.id })
            break
        }
    } if (index) cronJobs.splice(index, 1)

    return index != undefined
}