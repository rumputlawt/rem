import { Command } from "~/utils/command.ts";

import createVerify from "./create_verify.ts";

export default [
	createVerify,
] satisfies Command[];
