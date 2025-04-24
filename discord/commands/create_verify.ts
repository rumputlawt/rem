import {
	InteractionContextType,
	MessageFlags,
	PermissionFlagsBits,
	Utils,
} from "@discordjs/core";
import { slashCommand } from "~/utils/command.ts";
import {
	deferReplyInteraction,
	replyInteraction,
} from "~/utils/interaction.ts";
import { createVerifyMessage } from "~/utils/verify_member.ts";

export default slashCommand({
	data: {
		name: "create-verify",
		description: "Create a verify message",
		default_member_permissions: String(PermissionFlagsBits.ManageGuild),
		contexts: [InteractionContextType.Guild],
	},
	execute(interaction) {
		if (Utils.isGuildInteraction(interaction)) {
			queueMicrotask(() => createVerifyMessage(interaction));
			return deferReplyInteraction({ flags: MessageFlags.Ephemeral });
		} else {
			return replyInteraction({
				content: "this command only available in guild",
			});
		}
	},
});
