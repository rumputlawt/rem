import {
	APIApplicationCommandInteraction,
	APIChatInputApplicationCommandInteraction,
	APIInteractionResponseCallbackData,
	APIInteractionResponseChannelMessageWithSource,
	APIInteractionResponseDeferredChannelMessageWithSource,
	APIInteractionResponseDeferredMessageUpdate,
	APIMessageComponentButtonInteraction,
	APIMessageComponentInteraction,
	ApplicationCommandType,
	ComponentType,
	InteractionResponseType,
} from "@discordjs/core";

export function isButtonComponentInteraction(
	interaction: APIMessageComponentInteraction,
): interaction is APIMessageComponentButtonInteraction {
	return interaction.data.component_type === ComponentType.Button;
}

export function isSlashCommandInteraction(
	interaction: APIApplicationCommandInteraction,
): interaction is APIChatInputApplicationCommandInteraction {
	return interaction.data.type === ApplicationCommandType.ChatInput;
}

export function deferReplyInteraction(
	data?: APIInteractionResponseCallbackData,
): APIInteractionResponseDeferredChannelMessageWithSource {
	return {
		data,
		type: InteractionResponseType.DeferredChannelMessageWithSource,
	};
}

export function deferUpdate(): APIInteractionResponseDeferredMessageUpdate {
	return { type: InteractionResponseType.DeferredMessageUpdate };
}

export function replyInteraction(
	data: APIInteractionResponseCallbackData,
): APIInteractionResponseChannelMessageWithSource {
	return { data, type: InteractionResponseType.ChannelMessageWithSource };
}
