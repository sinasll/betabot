const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.BOT_TOKEN;

if (!TOKEN) {
  console.error("❌ BOT_TOKEN is missing");
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, {
  polling: {
    interval: 1000,
    autoStart: true,
  },
});

console.log("✅ PESH bot is running...");

function getWelcomeMessage(firstName = "there") {
  return `Welcome to PESH, ${firstName}! ⚽

Predict FIFA World Cup 2026 match results, challenge your friends, earn points, and climb the leaderboard.

Good luck, and may the best predictor win!`;
}

bot.onText(/^\/start(?:\s|$)/i, async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from?.first_name || "there";

  try {
    await bot.sendMessage(chatId, getWelcomeMessage(firstName), {
      disable_web_page_preview: true,
    });
  } catch (error) {
    console.error("❌ Failed to send welcome message:", error);
  }
});

bot.onText(/^\/help(?:\s|$)/i, async (msg) => {
  try {
    await bot.sendMessage(
      msg.chat.id,
      "Use /start to open the welcome message and begin predicting matches."
    );
  } catch (error) {
    console.error("❌ Failed to send help message:", error);
  }
});

bot.on("polling_error", (error) => {
  console.error("❌ Polling error:", error.message);
});

process.on("SIGINT", () => bot.stopPolling());
process.on("SIGTERM", () => bot.stopPolling());
