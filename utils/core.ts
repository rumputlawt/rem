import { createDefine } from "fresh";
import { envOrThrow } from "@dudasaus/env-or-throw";
import { REST } from "@discordjs/rest";
import { API } from "@discordjs/core";

// deno-lint-ignore no-empty-interface
export interface State {}

export const define = createDefine<State>();

export function discord() {
	const token = envOrThrow("DISCORD_TOKEN");
	const rest = new REST().setToken(token);
	return new API(rest);
}
