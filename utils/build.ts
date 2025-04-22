import { walk, WalkOptions } from "@std/fs/walk";
import { Command } from "./command.ts";

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

export async function loadManifest() {
	const manifestPath = "../bot.gen.ts";
	const { default: manifest }: { default: Manifest } = await import(
		manifestPath
	);
	return manifest;
}

export interface Manifest {
	commands: Command[];
}
