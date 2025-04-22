import { slashCommand } from "../utils/command.ts";
import { replyInteraction } from "../utils/interaction.ts";

export default slashCommand({
	data: {
		name: "welcome-test",
		description: "Test welcome image",
	},
	execute(_interaction) {
		return replyInteraction({
			content: "ok",
		});
	},
});
