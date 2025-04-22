import { APIUser } from "@discordjs/core";
import { discord } from "./core.ts";
import { calculateUserDefaultAvatarIndex } from "@discordjs/rest";

export function avatar(user: APIUser) {
	const { cdn } = discord().rest;
	return user.avatar
		? cdn.avatar(user.id, user.avatar)
		: cdn.defaultAvatar(calculateUserDefaultAvatarIndex(user.id));
}
