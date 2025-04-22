import { walk, WalkOptions } from "@std/fs/walk";

const WALK_OPTIONS: WalkOptions = {
	maxDepth: 1,
	includeDirs: false,
	includeSymlinks: false,
	exts: [".ts"],
};

export async function build() {
	const commands = await Array.fromAsync(walk("./commands", WALK_OPTIONS));

	const manifestStr = `
    ${
		commands.map((command, index) =>
			`import $${index} from "./commands/${command.name}"
        
            export default {
                commands: [
                    ${commands.map((_command, index) => `$${index}`)}
                ]
            }`
		)
	}`;

	await Deno.writeTextFile("bot.gen.ts", manifestStr);
	await new Deno.Command(Deno.execPath(), { args: ["fmt", "bot.gen.ts"] })
		.output();
}
