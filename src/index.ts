require('dotenv').config()
import * as fs from 'node:fs'
import * as path from 'node:path'
import { Awaitable, Client as DiscordClient, Collection, GatewayIntentBits } from 'discord.js'
import { Collection as MongoCollection, Document, MongoClient, ServerApiVersion, WithId } from 'mongodb'
import { MONGODATABASE, MAPCOLLECTION, MESSAGESCOLLECTION } from './classes/Constants'
import Command from './classes/Command'
import CronJob from './classes/CronJob'

const client : DiscordClient = new DiscordClient({ intents : [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]})

const cmmnds : Collection<string, Command> = new Collection<string, Command>()
const commandsPath : fs.PathLike = path.join(__dirname, 'commands')
const commandFiles : string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'))

for(const file of commandFiles) {
    const filePath : string = path.join(commandsPath, file)
    const { command } = require(filePath)
    cmmnds.set(command.data.name, command)
}

const eventsPath : fs.PathLike = path.join(__dirname, 'events')
const eventFiles : string[] = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'))

for(const file of eventFiles) {
    const filePath : string = path.join(eventsPath, file)
    const { event } = require(filePath)
    if (event.once) client.once(event.name, (...args) : Awaitable<void> => event.execute(...args))
    else client.on(event.name, (...args) : Awaitable<void> => event.execute(...args))
}

let db : MongoClient | undefined
const cnvrsnMap : Collection<string, string[]> = new Collection<string, string[]>()
const bltInMsgs : Collection<string, string> = new Collection<string, string>()

if(process.env.MONGODB_URL) {
    db = new MongoClient(process.env.MONGODB_URL, { serverApi  : ServerApiVersion.v1 })
    db?.connect(async error => {
        if(error) {
            console.error(error)
            db = undefined
        } else {
            const mapCollection : MongoCollection | undefined = db?.db(MONGODATABASE).collection(MAPCOLLECTION)
            const mapDocuments : WithId<Document>[] | undefined = await mapCollection?.find({}).toArray()

            if(mapDocuments) {
                for(const doc of mapDocuments) cnvrsnMap.set(doc.char, doc.emojis)
            }

            console.log('Successfully got the conversion map from the database')

            const messagesCollection : MongoCollection | undefined = db?.db(MONGODATABASE).collection(MESSAGESCOLLECTION)
            const messageDocuments : WithId<Document>[] | undefined = await messagesCollection?.find({}).toArray()
            
            if(messageDocuments) {
                for(const doc of messageDocuments) bltInMsgs.set(doc.label, doc.message)
            }

            console.log('Successfully got the built in messages from the database')
        }
    })
}

if(process.env.TOKEN) {
    client.login(process.env.TOKEN)
} else console.error('MISSING TOKEN ENVIRONMENT VARIABLE')

export const commands : Collection<string, Command> = cmmnds
export const database : MongoClient | undefined = db
export const conversionMap : Collection<string, string[]> = cnvrsnMap
export const builtInMessages : Collection<string, string> = bltInMsgs
export const cronJobs : CronJob[] = []