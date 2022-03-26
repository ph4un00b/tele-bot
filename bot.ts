import { Bot } from "./deps.ts";
import { commands } from "./commands.ts";

const token = Deno.env.get("TOKEN");
if (typeof token !== "string") throw new Error("no token!");
// https://api.telegram.org/bot<bot_token>/getMe
const bot = new Bot(token);
commands(bot);

export default bot;
