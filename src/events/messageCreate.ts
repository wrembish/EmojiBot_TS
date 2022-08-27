import { EmbedBuilder, Message } from 'discord.js'
import * as cron from 'node-cron'
import { Collection as MongoCollection, Document, WithId } from 'mongodb'
import { builtInMessages, cronJobs, database } from '../index'
import DiscordEvent from '../classes/DiscordEvent'
import { COMMANDCHAR, CRONCOLLECTION, DATABASEERRORMESSAGE, EMOJI , MONGODATABASE } from '../classes/Constants'
import { buildCronStr, convert, deleteCronJob, getDogFactsEmbed, getCatFactsEmbed } from '../classes/Helpers'
import CronJob from '../classes/CronJob'

export const event : DiscordEvent = new DiscordEvent(
    'messageCreate',
    false,
    async (message : Message) : Promise<void> => {
        if(message.client.user?.id === message.author.id) return

        const msg : string = message.content

        if(msg.startsWith(EMOJI)) {
            const content : string = msg.substring(EMOJI.length)
            const convertedStr : string = convert(content)
            await message.channel.send(convertedStr)
        } else if(msg.includes('/grit')) {
            const replyStr : string | undefined = builtInMessages.get('grit')
            if (replyStr) await message.channel.send(replyStr)
            else message.channel.send(DATABASEERRORMESSAGE)
        } else if(msg.toUpperCase().includes('SUCK')) {
            const replyStr : string | undefined = builtInMessages.get('succ')
            if (replyStr) await message.channel.send(replyStr)
            else await message.channel.send(DATABASEERRORMESSAGE)
        } else if(msg === '69' || msg.startsWith('69 ') || msg.endsWith(' 69') || msg.includes(' 69 ')) {
            const convertedStr : string = convert('69? nice')
            await message.channel.send(convertedStr)
        } else if(msg === '420' || msg.startsWith('420 ') || msg.endsWith(' 420') || msg.includes(' 420 ')) {
            const convertedStr : string = convert('420? nice')
            await message.channel.send(convertedStr)
        } else if(msg.includes('/oof') || msg.includes('/bigoof')) {
            const replyStr : string | undefined = builtInMessages.get('big_oof')
            if (replyStr) message.channel.send(replyStr)
            else message.channel.send(DATABASEERRORMESSAGE)
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                          New Features                                          //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        else if(msg.startsWith(`${COMMANDCHAR}set channel dogfacts `)) {
            const collection : MongoCollection | undefined = database?.db(MONGODATABASE).collection(CRONCOLLECTION)
            const cronDeleted : boolean = await deleteCronJob(message, collection, 'dogfacts')

            const timeStr : string = msg.substring(`${COMMANDCHAR}set channel dogfacts `.length)
            if(timeStr.endsWith('AM') || timeStr.endsWith('PM')) {
                const cronStr : string = buildCronStr(timeStr)

                await collection?.insertOne({ ChannelId : message.channelId, JobName : 'dogfacts', CronStr : cronStr })
                const mongoJob : WithId<Document>[] | undefined = await collection?.find({ ChannelId : message.channelId, JobName : 'dogfacts' }).toArray()

                const cronJob : cron.ScheduledTask = cron.schedule(cronStr, async () : Promise<void> => {
                    const messageEmbed : EmbedBuilder = await getDogFactsEmbed()
                    await message.channel.send({ embeds : [messageEmbed] })
                })

                if(mongoJob) {
                    cronJobs.push(new CronJob(
                        mongoJob[0]._id,
                        message.channelId,
                        cronStr,
                        'dogfacts',
                        cronJob
                    ))
                }
                if (cronDeleted) await message.channel.send(`**Channel successfully rescheduled to recieve a random dogfact daily at __${timeStr}__**`)
                else await message.channel.send(`**Channel successfully set to receive a random dogfact daily at __${timeStr}__**`)
            }
        } else if(msg === `${COMMANDCHAR}remove channel dogfacts`) {
            const collection : MongoCollection | undefined = database?.db(MONGODATABASE).collection(CRONCOLLECTION)
            const cronDeleted : boolean = await deleteCronJob(message, collection, 'dogfacts')

            if (cronDeleted) await message.channel.send('**Successfully removed this channel from recieving daily dogfacts**')
            else await message.channel.send('**This channel isn\'t currently receiving daily dogfacts**')
        }

        else if(msg.startsWith(`${COMMANDCHAR}set channel catfacts `)) {
            const collection : MongoCollection | undefined = database?.db(MONGODATABASE).collection(CRONCOLLECTION)
            const cronDeleted : boolean = await deleteCronJob(message, collection, 'catfacts')

            const timeStr : string = msg.substring(`${COMMANDCHAR}set channel catfacts `.length)
            if(timeStr.endsWith('AM') || timeStr.endsWith('PM')) {
                const cronStr : string = buildCronStr(timeStr)

                await collection?.insertOne({ ChannelId : message.channelId, JobName : 'catfacts', CronStr : cronStr })
                const mongoJob : WithId<Document>[] | undefined = await collection?.find({ ChannelId : message.channelId, JobName : 'catfacts' }).toArray()

                const cronJob : cron.ScheduledTask = cron.schedule(cronStr, async () : Promise<void> => {
                    const messageEmbed : EmbedBuilder = await getCatFactsEmbed()
                    await message.channel.send({ embeds : [messageEmbed] })
                })

                if(mongoJob) {
                    cronJobs.push(new CronJob(
                        mongoJob[0]._id,
                        message.channelId,
                        cronStr,
                        'catfacts',
                        cronJob
                    ))
                }

                if (cronDeleted) await message.channel.send(`**Channel successfully rescheduled to receive a random catfact daily at __${timeStr}__**`)
                else await message.channel.send(`**Channel successfully set to receive a random catfact daily at __${timeStr}__**`)
            }
        } else if(msg === `${COMMANDCHAR}remove channel catfacts`) {
            const collection : MongoCollection | undefined = database?.db(MONGODATABASE).collection(CRONCOLLECTION)
            const cronDeleted : boolean = await deleteCronJob(message, collection, 'catfacts')

            if (cronDeleted) await message.channel.send('**Successfully removed this channel from receiving daily catfacts**')
            else await message.channel.send('**This channel isn\'t currently receiving daily catfacts**')
        }
    }
)