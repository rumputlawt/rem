import {
	APIApplicationCommandInteraction,
	APIChatInputApplicationCommandInteraction,
	APIInteractionResponseCallbackData,
	APIInteractionResponseChannelMessageWithSource,
	APIInteractionResponseDeferredChannelMessageWithSource,
	ApplicationCommandType,
	InteractionResponseType,
} from "@discordjs/core";

export function isSlashCommandInteraction(
	interaction: APIApplicationCommandInteraction,
): interaction is APIChatInputApplicationCommandInteraction {
	return interaction.data.type === ApplicationCommandType.ChatInput;
}

export function deferReplyInteraction(): APIInteractionResponseDeferredChannelMessageWithSource {
	return { type: InteractionResponseType.DeferredChannelMessageWithSource };
}

export function replyInteraction(
	data: APIInteractionResponseCallbackData,
): APIInteractionResponseChannelMessageWithSource {
	return { data, type: InteractionResponseType.ChannelMessageWithSource };
}
