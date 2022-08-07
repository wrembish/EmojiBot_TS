import { ModalSubmitInteraction } from 'discord.js'
import Command from '../classes/Command'

export const command : Command = new Command(
    'user',
    'Replies with user info!',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`)
    }
)