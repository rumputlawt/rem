import { HttpError } from "fresh";
import { define } from "../../utils/core.ts";
import { envOrThrow } from "@dudasaus/env-or-throw";
import { STATUS_CODE } from "@std/http/status";
import {
	APIInteraction,
	APIInteractionResponsePong,
	InteractionResponseType,
	InteractionType,
} from "@discordjs/core";
import tweetnacl from "tweetnacl";
import { decodeHex } from "@std/encoding/hex";

export const handler = define.handlers({
	async POST(ctx) {
		const body = await ctx.req.text();
		const publicKey = envOrThrow("DISCORD_PUBLIC_KEY");
		const signature = ctx.req.headers.get("x-signature-ed25519");
		const timestamp = ctx.req.headers.get("x-signature-timestamp");

		const unauthorized = new HttpError(STATUS_CODE.Unauthorized);

		if (!signature || !timestamp) {
			throw unauthorized;
		} else {
			const valid = tweetnacl.sign.detached.verify(
				new TextEncoder().encode(timestamp + body),
				decodeHex(signature),
				decodeHex(publicKey),
			);

			if (!valid) {
				throw unauthorized;
			} else {
				const interaction: APIInteraction = JSON.parse(body);

				switch (interaction.type) {
					case InteractionType.Ping: {
						return Response.json(
							{
								type: InteractionResponseType.Pong,
							} satisfies APIInteractionResponsePong,
						);
					}
					default: {
						throw new HttpError(STATUS_CODE.NotImplemented);
					}
				}
			}
		}
	},
});
