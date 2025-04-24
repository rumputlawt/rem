import { MessageFlags, Utils } from "@discordjs/core";
import { envOrThrow } from "@dudasaus/env-or-throw";
import { buttonComponent } from "~/utils/component.ts";
import {
	deferReplyInteraction,
	replyInteraction,
} from "~/utils/interaction.ts";
import { verifyMember } from "~/utils/verify_member.ts";

export default buttonComponent({
	customId: "verify",
	execute(interaction) {
		if (Utils.isGuildInteraction(interaction)) {
			const memberRoleId = envOrThrow("DISCORD_MEMBER_ROLE_ID");

			if (interaction.member.roles.includes(memberRoleId)) {
				return replyInteraction({
					content: "Tysm!",
					flags: MessageFlags.Ephemeral,
				});
			} else {
				queueMicrotask(() =>
					verifyMember(
						interaction,
						envOrThrow("DISCORD_GUILD_ID"),
						envOrThrow("DISCORD_MEMBER_ROLE_ID"),
						envOrThrow("DISCORD_WELCOME_CHANNEL_ID"),
					)
				);
				return deferReplyInteraction({ flags: MessageFlags.Ephemeral });
			}
		} else {
			return replyInteraction({
				content: "This button should only appear on guild...",
				flags: MessageFlags.Ephemeral,
			});
		}
	},
});
