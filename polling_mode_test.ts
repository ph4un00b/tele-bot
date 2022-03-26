import { Bot, GrammyError, HttpError } from "./deps.ts";
import { commands } from "./commands.ts";
import { config } from "./dev_deps.ts";
config({ safe: true, export: true });

const token = Deno.env.get("POLLING_TOKEN");
if (typeof token !== "string") throw new Error("no token!");
const bot = new Bot(token);

commands(bot);

bot.start({
  // https://core.telegram.org/bots/api#update
  allowed_updates: [
    "chat_member",
    "message",
    "edited_message",
    "inline_query",
    "chosen_inline_result",
  ],
});

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});
