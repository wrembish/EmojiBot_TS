export default class DiscordEvent {
    public name : string
    public once : boolean
    public execute : Function

    /**
     * Constructor for the DiscordEvent Class
     * @param name The name of the Event
     * @param once Whether the Event runs once or not
     * @param execute The Event Handler Function
     */
    constructor(name : string, once : boolean, execute : Function) {
        this.name = name
        this.once = once
        this.execute = execute
    }
}