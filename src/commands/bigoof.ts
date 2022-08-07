import { ModalSubmitInteraction } from "discord.js";
import Command from "../classes/Command";

export const command : Command = new Command(
    'bigoof',
    'bigoof',
    async (interaction : ModalSubmitInteraction) : Promise<void> => {
        const { big_oof } = require('../emojibot_files/builtInMessages.json')
        if(big_oof) await interaction.reply(big_oof)
        else await interaction.reply('Something went wrong')
    }
)