import { createCanvas, loadImage } from "@gfx/canvas-wasm";
import {
	APIChatInputApplicationCommandGuildInteraction,
	APIMessageComponentGuildInteraction,
	ButtonStyle,
	ComponentType,
	Snowflake,
} from "@discordjs/core";
import { discord } from "~/utils/core.ts";
import { avatar } from "~/utils/avatar.ts";
import { userMention } from "@discordjs/formatters";

export async function createVerifyMessage(
	interaction: APIChatInputApplicationCommandGuildInteraction,
) {
	const bot = discord();

	await bot.channels.createMessage(interaction.channel.id, {
		content: "Have u read the rules?",
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						style: ButtonStyle.Primary,
						custom_id: "verify",
						emoji: { name: "🍀" },
						label: "Yes, I do",
					},
				],
			},
		],
	});
	await bot.interactions.editReply(
		interaction.application_id,
		interaction.token,
		{
			content: "Created.",
		},
	);
}

export async function welcomeImage(avatarUrl: string, username: string) {
	const canvas = createCanvas(1200, 500);
	const context = canvas.getContext("2d");

	context.drawImage(
		await loadImage("./discord/assets/welcome_background.png"),
		0,
		0,
		canvas.width,
		canvas.height,
	);

	canvas.loadFont(await Deno.readFile("./discord/assets/Norse.otf"), {
		family: "Norse",
		weight: "2",
	});
	context.font = "normal 120px Norse";
	context.fillStyle = "#674B30";
	context.strokeStyle = "#674B30";
	context.lineWidth = 2.5;

	const textPosition = {
		x: 505,
		y: 310,
	};

	context.textAlign = "center";
	context.lineWidth = 2;
	context.strokeText(
		username,
		textPosition.x,
		textPosition.y,
	);
	context.fillText(
		username,
		textPosition.x,
		textPosition.y,
	);

	context.save();

	context.beginPath();
	context.arc(265.80, 251, 135, 0, Math.PI * 2, true);
	context.closePath();
	context.clip();

	const avatarImage = await loadImage(avatarUrl);
	context.drawImage(avatarImage, 125, 109, 283, 283);

	context.restore();

	context.drawImage(
		await loadImage("./discord/assets/welcome_layer.png"),
		0,
		0,
		canvas.width,
		canvas.height,
	);

	return await canvas.toBuffer();
}

export async function verifyMember(
	interaction: APIMessageComponentGuildInteraction,
	guildId: Snowflake,
	roleId: Snowflake,
	welcomeChannelId: Snowflake,
) {
	const bot = discord();
	await bot.guilds.addRoleToMember(
		guildId,
		interaction.member.user.id,
		roleId,
	);
	await bot.channels.createMessage(welcomeChannelId, {
		content: `${
			userMention(interaction.member.user.id)
		} joined the garden.`,
		files: [
			{
				name: "welcome.png",
				data: await welcomeImage(
					avatar(interaction.member.user, { size: 512 }),
					interaction.member.user.username,
				),
			},
		],
	});
	await bot.interactions.editReply(
		interaction.application_id,
		interaction.token,
		{
			content: "Tysm!",
		},
	);
}
