import { createCanvas, loadImage } from "@gfx/canvas-wasm";

export async function welcomeImage(avatarUrl: string, username: string) {
	const canvas = createCanvas(1200, 500);
	const context = canvas.getContext("2d");

	context.drawImage(
		await loadImage("./assets/welcome_background.png"),
		0,
		0,
		canvas.width,
		canvas.height,
	);

	canvas.loadFont(await Deno.readFile("./assets/Norse.otf"), {
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
		await loadImage("./assets/welcome_layer.png"),
		0,
		0,
		canvas.width,
		canvas.height,
	);

	return await canvas.toBuffer();
}
