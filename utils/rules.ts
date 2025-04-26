import {
	APIChatInputApplicationCommandInteraction,
	ButtonStyle,
	MessageFlags,
	SeparatorSpacingSize,
} from "@discordjs/core";
import { discord } from "~/utils/core.ts";
import {
	ActionRowBuilder,
	bold,
	ButtonBuilder,
	ContainerBuilder,
	heading,
	italic,
	MediaGalleryBuilder,
	MediaGalleryItemBuilder,
	orderedList,
	SeparatorBuilder,
	TextDisplayBuilder,
} from "@discordjs/builders";

export const rules: Rule[] = [
	{
		title: "No doxxing",
		description:
			"Don't share anyone's personal info. It's not cool, and it puts people at risk.",
	},
	{
		title:
			"Toxicity is allowed (kinda), but don't overdo it (nicknames too)",
		description:
			"A little chaos is fine, but don't go too far. If it starts making people uncomfortable, it's a problem.",
	},
	{
		title: "Stick to channel purposes",
		description:
			"Each channel exists for a reason. Don't spam memes in announcements or drop serious talks in general chat.",
	},
	{
		title: "Don't mess around in voice chats",
		description:
			"No earrape, no weird noises, no chaos-for-the-sake-of-chaos. Let people chill in peace.",
	},
	{
		title: "No NSFW content (nicknames & profile pics included)",
		description:
			"Keep it clean. Not everyone wants to see that, and we've got younger folks around too.",
	},
	{
		title: "Don't bring sensitive/controversial topics here",
		description:
			"This isn't the place for political, religious, or heavy real-life debates. Keep it light.",
	},
	{
		title: "No weird or sketchy files",
		description:
			"Don't send anything shady. If it looks sus, it's getting deleted and you might too.",
	},
];

export interface Rule {
	title: string;
	description: string;
}

export async function showRules(
	interaction: APIChatInputApplicationCommandInteraction,
) {
	const bot = discord();

	await bot.channels.createMessage(interaction.channel.id, {
		flags: MessageFlags.IsComponentsV2,
		components: [
			new ContainerBuilder().setAccentColor(0xF5F0D6)
				.addTextDisplayComponents(
					new TextDisplayBuilder({
						content: heading("🪸 Garden Guidelines"),
					}),
				).addSeparatorComponents(
					new SeparatorBuilder({
						spacing: SeparatorSpacingSize.Small,
						divider: false,
					}),
				).addTextDisplayComponents(
					new TextDisplayBuilder({
						content: italic(
							"Follow Discord Community Guidelines and Terms of Service",
						),
					}),
				).addActionRowComponents(
					new ActionRowBuilder<ButtonBuilder>().setComponents(
						new ButtonBuilder({
							style: ButtonStyle.Link,
							label: "Community Guidelines",
							url: "https://discord.com/guidelines",
						}),
						new ButtonBuilder({
							style: ButtonStyle.Link,
							label: "Terms of Service",
							url: "https://discord.com/terms",
						}),
					),
				).addSeparatorComponents(
					new SeparatorBuilder({
						spacing: SeparatorSpacingSize.Large,
					}),
				).addTextDisplayComponents(
					new TextDisplayBuilder({
						content: orderedList(
							rules.map((rule) =>
								`${bold(rule.title)} - ${
									italic(rule.description)
								}`
							),
						),
					}),
				).addMediaGalleryComponents(
					new MediaGalleryBuilder().addItems(
						new MediaGalleryItemBuilder({
							media: {
								url: "attachment://rules.png",
							},
						}),
					),
				).addSeparatorComponents(
					new SeparatorBuilder({
						spacing: SeparatorSpacingSize.Small,
					}),
				).addTextDisplayComponents(
					new TextDisplayBuilder({
						content: bold("Have u read the rules?"),
					}),
				).addActionRowComponents(
					new ActionRowBuilder<ButtonBuilder>().setComponents(
						new ButtonBuilder({
							custom_id: "verify",
							style: ButtonStyle.Primary,
							label: "Yes, I do",
							emoji: { name: "🍀" },
						}),
					),
				).toJSON(),
		],
		files: [
			{
				name: "rules.png",
				data: await Deno.readFile("./discord/assets/rules.png"),
			},
		],
	});
	await bot.interactions.editReply(
		interaction.application_id,
		interaction.token,
		{ content: "sent." },
	);
}
