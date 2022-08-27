import { EmbedBuilder, ModalSubmitInteraction } from 'discord.js'
import { EMBEDCOLOR } from '../classes/Constants'
import Command from '../classes/Command'

// https://cataas.com/#/

export const command : Command = new Command(
    'cat',
    'Get a random cat image',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        // get a random cat image from the cats as a service api
        let result : any
        await fetch('https://cataas.com/cat?json=true')
            .then((response : Response) : any => response.json())
            .then((data : any) : void => result = data)
            .catch((error : any) : void => console.error('Error: ', error))

        await interaction.reply({ embeds : [new EmbedBuilder().setImage(`https://cataas.com${result.url}`).setColor(EMBEDCOLOR)] })
    }
)