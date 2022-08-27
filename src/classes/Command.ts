import { SlashCommandBuilder } from 'discord.js'

export default class Command {
    public data : SlashCommandBuilder
    public execute : Function

    /**
     * Constructor for the Command Class
     * @param name The name of the Slash Command
     * @param description The description of the Slash Command
     * @param execute The Function that will execute when the Slash Command interaction is recieved
     */
    constructor(name : string, description : string, execute : Function) {
        this.data = new SlashCommandBuilder()
            .setName(name)
            .setDescription(description)

        this.execute = execute
    }
}