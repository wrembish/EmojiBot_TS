import { ObjectId } from 'mongodb'
import * as cron from 'node-cron'

export default class CronJob {
    public id : ObjectId
    public channel : string
    public cronStr : string
    public job : string
    public cronJob : cron.ScheduledTask

    /**
     * Constructor for the CronJob Class
     * @param id The _id of the MongoDB document of the CronJob
     * @param channel The Discord Channel ID that the CronJob is scheduled for
     * @param cronStr The cron string for when to schedule the CronJob
     * @param job The name of the cron job to run
     * @param cronJob The ScheduledTask object of the Cron Job that is actually scheduled
     */
    constructor(id : ObjectId, channel : string, cronStr : string, job : string, cronJob : cron.ScheduledTask) {
        this.id = id
        this.channel = channel
        this.cronStr = cronStr
        this.job = job
        this.cronJob = cronJob
    }
}