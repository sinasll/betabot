const TelegramBot = require("node-telegram-bot-api");

// 🔐 Token from environment
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

// =====================
// START
// =====================
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    "Welcome to Parena.\nSelect an option below:",
    {
      reply_markup: {
        keyboard: [
          ["Open App", "Leaderboard"],
          ["Matches", "Help"]
        ],
        resize_keyboard: true
      }
    }
  );
});

// =====================
// OPEN APP
// =====================
bot.onText(/Open App/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Parena app is ready.\nOpen it from your main menu."
  );
});

// =====================
// LEADERBOARD
// =====================
bot.onText(/Leaderboard/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Leaderboard is available inside the app."
  );
});

// =====================
// MATCHES
// =====================
bot.onText(/Matches/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Matches are updated live inside the app."
  );
});

// =====================
// HELP
// =====================
bot.onText(/Help/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Parena Commands:\n\nOpen App\nLeaderboard\nMatches\nHelp"
  );
});

// =====================
// FALLBACK
// =====================
bot.on("message", (msg) => {
  const text = msg.text;

  const allowed = [
    "/start",
    "Open App",
    "Leaderboard",
    "Matches",
    "Help"
  ];

  if (!allowed.includes(text)) {
    bot.sendMessage(msg.chat.id, "Unknown command. Use /start");
  }
});
