import { Context, NextFunction } from "./deps.ts";

/** Measures the response time of the bot, and logs it to `console` */
export async function responseTime(
  _ctx: Context,
  next: NextFunction, // is an alias for: () => Promise<void>
): Promise<void> {
  // TODO: implement
  const b4 = Date.now();

  // DANGER: Always Make Sure to await next!
  // If you ever call next() without the await keyword, several things
  // will break:

  // ❌ Your middleware stack will be executed in the wrong order.
  // ❌ If an error happens, your error handler will not be called
  // for it. Instead, you will see that an UnhandledPromiseRejectionWarning will occur, which may crash your bot process
  // ❌ The backpressure mechanism of grammY runner breaks, which
  // protects your server from overly-high load, such as during load
  // spikes.
  await next();
  const after = Date.now();

  console.log(`Response time: ${after - b4} ms`);
}
