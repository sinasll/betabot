const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.BOT_TOKEN;

if (!TOKEN) {
  console.error("BOT_TOKEN missing");
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, {
  polling: {
    interval: 1000,
    autoStart: true
  }
});

console.log("Parena bot running...");

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Welcome to PESH! ⚽

Predict FIFA World Cup 2026 match results, challenge your friends, earn points, and climb the leaderboard to prove your football knowledge.

Good luck, and may the best predictor win!
"
  );
});
