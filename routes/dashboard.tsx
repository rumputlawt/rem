import { page } from "fresh";
import { define } from "../utils/core.ts";

export const handler = define.handlers({
	GET(ctx) {
		const { user } = ctx.state;

		if (user) {
			return page({ user });
		} else {
			return ctx.redirect("/");
		}
	},
});

export default define.page<typeof handler>(({ data }) => {
	const { user } = data;

	return (
		<div class="flex flex-col px-4 pt-4 h-dvh bg-[#F5F0D6]">
			<div class="flex items-center justify-between">
				<img class="size-8" src="/clover_green.png" />
				<img
					class="size-10 rounded-full border-2 border-[#593310]"
					src={user.avatar_url}
				/>
			</div>
		</div>
	);
});
