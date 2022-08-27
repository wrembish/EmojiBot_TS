import * as cron from 'node-cron'
import { Client, EmbedBuilder, TextChannel } from 'discord.js'
import { Collection as MongoCollection, Document, WithId } from 'mongodb'
import { getDogFactsEmbed, getCatFactsEmbed } from '../classes/Helpers'
import { MONGODATABASE, CRONCOLLECTION } from '../classes/Constants'
import DiscordEvent from '../classes/DiscordEvent'
import { cronJobs, database } from '../index'
import CronJob from '../classes/CronJob'

export const event : DiscordEvent = new DiscordEvent(
    'ready',
    true,
    async (client : Client) : Promise<void> => {
        // alert the console when the client is ready
        console.log(`Ready! Logged in as ${client.user?.tag}`)

        // Retrieve any cron jobs from the database and schedule them
        // once the client is ready
        const collection : MongoCollection | undefined = database?.db(MONGODATABASE).collection(CRONCOLLECTION)
        const documents : WithId<Document>[] | undefined = await collection?.find({}).toArray()

        if(documents) {
            for(const doc of documents) {
                const cronJob : cron.ScheduledTask = cron.schedule(doc.CronStr, async () : Promise<void> => {
                    if(doc.JobName === 'dogfacts') {
                        const messageEmbed : EmbedBuilder = await getDogFactsEmbed()
                        const channel : TextChannel | undefined = client.channels.cache.get(doc.ChannelId) as TextChannel
                        channel.send({ embeds : [messageEmbed] })
                    } else if(doc.JobName === 'catfacts') {
                        const messageEmbed : EmbedBuilder = await getCatFactsEmbed()
                        const channel : TextChannel | undefined = client.channels.cache.get(doc.ChannelId) as TextChannel
                        channel.send({ embeds : [messageEmbed] })
                    }
                })

                cronJobs.push(new CronJob(
                    doc._id,
                    doc.ChannelId,
                    doc.CronStr,
                    doc.JobName,
                    cronJob
                ))
            }

            console.log(`${cronJobs.length} Cron Jobs have been scheduled successfully!`)
        }
    }
)