import {
	APIApplicationCommandInteraction,
	APIChatInputApplicationCommandInteraction,
	APIInteractionResponse,
	APIInteractionResponsePong,
	ApplicationCommandType,
	RESTPostAPIApplicationCommandsJSONBody,
	RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "@discordjs/core";
import { discord } from "./core.ts";
import { envOrThrow } from "@dudasaus/env-or-throw";
import { loadManifest } from "./build.ts";

interface BaseCommand<
	Data extends RESTPostAPIApplicationCommandsJSONBody,
	Interaction extends APIApplicationCommandInteraction,
> {
	data: Data;
	execute(interaction: Interaction): CommandResponse;
}
export type CommandResponse = Exclude<
	APIInteractionResponse,
	APIInteractionResponsePong
>;

export function findCommand(
	name: string,
	type: ApplicationCommandType.ChatInput,
): Promise<SlashCommand | undefined>;
export async function findCommand(name: string, type: ApplicationCommandType) {
	const manifest = await loadManifest();
	return manifest.commands.find((command) =>
		command.data.name === name && command.data.type === type
	);
}

export async function deployCommands() {
	const manifest = await loadManifest();
	await discord().applicationCommands.bulkOverwriteGlobalCommands(
		envOrThrow("DISCORD_ID"),
		manifest.commands.map((command) => command.data),
	);
}

export function slashCommand(
	{ data, execute }: BaseCommand<
		RESTPostAPIChatInputApplicationCommandsJSONBody,
		APIChatInputApplicationCommandInteraction
	>,
) {
	return {
		data: { ...data, type: ApplicationCommandType.ChatInput },
		execute,
	};
}
export type SlashCommand = ReturnType<typeof slashCommand>;

export type Command = SlashCommand;
