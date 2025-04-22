import { walk, WalkOptions } from "@std/fs/walk";
import { Command } from "./command.ts";
import { Mode } from "fresh";

const WALK_OPTIONS: WalkOptions = {
	maxDepth: 1,
	includeDirs: false,
	includeSymlinks: false,
	exts: [".ts"],
};

export async function build() {
	const commands = await Array.fromAsync(walk("./commands", WALK_OPTIONS));

	const manifestStr = `
	import type { Manifest } from "./utils/build.ts";

    ${
		commands.map((command, index) =>
			`import $${index} from "./commands/${command.name}"
        
            export default {
                commands: [
                    ${commands.map((_command, index) => `$${index}`)}
                ]
            } satisfies Manifest`
		)
	}`;

	await Deno.writeTextFile("bot.gen.ts", manifestStr);
	await new Deno.Command(Deno.execPath(), { args: ["fmt", "bot.gen.ts"] })
		.output();
}

export async function loadManifest(mode: Mode) {
	const manifestFile = mode === "production" ? "bot.gen.ts" : "dev.gen.ts";
	const { default: manifest }: { default: Manifest } = await import(
		`~/${manifestFile}`
	);
	return manifest;
}

export interface Manifest {
	commands: Command[];
}

export type { Mode };
