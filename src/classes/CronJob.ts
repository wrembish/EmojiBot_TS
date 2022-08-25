import { ObjectId } from 'mongodb'
import * as cron from 'node-cron'

export default class CronJob {
    public id : ObjectId
    public channel : string
    public cronStr : string
    public job : string
    public cronJob : cron.ScheduledTask

    constructor(id : ObjectId, channel : string, cronStr : string, job : string, cronJob : cron.ScheduledTask) {
        this.id = id
        this.channel = channel
        this.cronStr = cronStr
        this.job = job
        this.cronJob = cronJob
    }
}