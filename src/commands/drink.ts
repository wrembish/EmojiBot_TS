import { EmbedBuilder, ModalSubmitInteraction } from 'discord.js'
import { EMBEDCOLOR } from '../classes/Constants'
import Command from '../classes/Command'

// http://www.thecocktaildb.com

export const command : Command = new Command(
    'drink',
    'Get a random drink recommendation',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        // get a random cocktail from the cocktail database api, if the
        // returned cocktail is non alcoholic, keep trying
        let result : any
        do {
            await fetch('http://www.thecocktaildb.com/api/json/v1/1/random.php')
                .then((response : Response) : any => response.json())
                .then((data : any) : void => result = data)
                .catch((error : any) : void => console.error('Error: ', error))
        } while (result.strAlcoholic === 'Non alcoholic')

        // if no drinks are returned, throw an error
        if(!result.drinks || result.drinks.length === 0) {
            await interaction.reply({ content : 'Something went wrong', ephemeral : true })
            console.error('Error: ', result)
            return
        }

        // Start building the reply
        const drink : any = result.drinks[0]
        const replyContent : string = `**${interaction.user} Why not give this drink a try?**`

        // Create the ingredients list on the reply embed description
        let embedDescription : string = '**__Ingredients List__**\n'
        for(let i : number = 0; i < 15; ++i) {
            if(drink[`strIngredient${i+1}`] != null) {
                embedDescription += drink[`strIngredient${i+1}`]
                if (drink[`strMeasure${i+1}`] != null) embedDescription += ` : ${drink[`strMeasure${i+1}`]}\n`
                else embedDescription += '\n'
            } else break
        }
        embedDescription += `\n**__Instructions__**\n${drink.strInstructions}`

        // Create the embed for the reply
        const replyEmbed : EmbedBuilder = new EmbedBuilder()
            .setTitle(`**${drink.strDrink}**`)
            .setImage(drink.strDrinkThumb)
            .setColor(EMBEDCOLOR)
            .setDescription(embedDescription)

        await interaction.reply({ content : replyContent, embeds : [replyEmbed] })
    }
)