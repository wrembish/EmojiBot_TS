import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

// http://dog-api.kinduff.com

export const command : Command = new Command(
    'dogfact',
    'Get a random fact about dogs',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        // get a random dog fact from the api hosted at http://dog-api.kinduff.com
        let result : any
        await fetch('http://dog-api.kinduff.com/api/facts')
            .then((response : Response) : any => response.json())
            .then((data : any) : void => result = data)
            .catch((error : any) : void => console.error('Error: ', error))

        await interaction.reply(`**${result.facts[0]}**`)
    }
)