/**
 * File to store any constants that might be used across multiple files
 * Makes it easier to change across the entire program if a contant needs to be updated
 */

import { ColorResolvable } from "discord.js"

// MongoDB constants
export const MONGODATABASE: string = 'ConversionMap'
export const MAPCOLLECTION: string = 'Character'
export const MESSAGESCOLLECTION: string = 'BuiltInMessage'
export const CRONCOLLECTION: string = 'CronJob'
// Command constants
export const COMMANDCHAR: string = '!!'
export const EMOJI: string = '!emoji'
// Error Message constants
export const DATABASEERRORMESSAGE: string = 'There was a problem connecting to the database. Please contact an administrator.'
export const INTERACTIONERRORMESSAGE: string = 'There was an error while executing this command!'
export const EMBEDCOLOR: ColorResolvable = 'LuminousVividPink'