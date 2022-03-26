import { Api, Bot, Context, RawApi } from "./deps.ts";
import { responseTime } from "./middlewares.ts";

// how middleware works?
// bot.on("filter_query", middleware as Function | Object)
// https://grammy.dev/guide/middleware.html#the-middleware-stack
export function commands(bot: Bot<Context, Api<RawApi>>) {
  bot.use(responseTime);
  const welcome_message =
    `Welcome to the tulum parties community | Official sellers!

  ☻  Be kind and respectful to each other.
  ☻  Harassing or trolling of any kind will not be tolerated.
  ☻  No inappropriate language or explicit content.
  ☻  No advertising or spamming that's unrelated to Tulum Party without permission from a staff member.
  ☻  Do not engage in activity that brings harm to the members of this community.

  ✓  Be cautious of any links or downloadable files sent to you privately.
  ✓  Be suspicious of anyone who slides into your DMs.
  ✓  Never send funds to anyone you don't know (obviously, right?).

  type /accept to complete.`;

  // ctx.api === bot.api
  bot.on("chat_member", async (ctx): Promise<void> => {
    const { new_chat_member: { status } } = ctx.chatMember;
    if (status !== "member") return;
    await ctx.api.sendMessage(ctx.from.id, welcome_message);
  });

  bot.command("start", (ctx) => ctx.reply(welcome_message));
  bot.command("clubs", (ctx) => ctx.reply("clubs info!"));
  bot.command("parties", (ctx) => ctx.reply("parties info!"));
  bot.command("location", (ctx) => ctx.reply("location info!"));
}
