import { EmbedBuilder, ModalSubmitInteraction } from 'discord.js'
import { EMBEDCOLOR } from '../classes/Constants'
import Command from '../classes/Command'

// https://www.themealdb.com

export const command : Command = new Command(
    'recipe',
    'Get a random recipe recommendation',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        // get a random recipe from the meal database api
        let result : any
        await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then((response : Response) : any => response.json())
            .then((data : any) : void => result = data)
            .catch((error : any) : void => console.error('Error: ', error))

        // If no recipes are returned, throw an error
        if(!result.meals || result.meals.length === 0) {
            await interaction.reply({ content : 'Something went wrong', ephemeral : true })
            console.error('Error: ', result)
            return
        }

        // Start building the reply
        const recipe : any = result.meals[0]
        const replyContent : string = `**${interaction.user} Why not give this recipe a try?**`

        // Create the ingredients list on the reply embed description
        let embedDescription = '**__Ingredient List__**'
        for(let i : number = 0; i < 20; ++i) {
            if(recipe[`strIngredient${i+1}`]) {
                embedDescription += recipe[`strIngredient${i+1}`]
                if(recipe[`strMeasure${i+1}`]) embedDescription += ` : ${recipe[`strMeasure${i+1}`]}\n`
                else embedDescription += '\n'
            } else break
        }
        embedDescription += `\n**__Instructions__**\n${recipe.strInstructions}`

        // create the embed for the reply
        const replyEmbed : EmbedBuilder = new EmbedBuilder()
            .setTitle(`**${recipe.strMeal}**`)
            .setImage(recipe.strMealThumb)
            .setColor(EMBEDCOLOR)
            .setDescription(embedDescription)

        await interaction.reply({ content : replyContent, embeds : [replyEmbed] })
    }
)