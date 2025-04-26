import { Command } from "~/utils/command.ts";

import createMessage from "./create_message.ts";

export default [
	createMessage,
] satisfies Command[];
