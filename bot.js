const TelegramBot = require("node-telegram-bot-api");

// 🔐 Token from Render Environment Variables
const TOKEN = process.env.BOT_TOKEN;

if (!TOKEN) {
  console.error("❌ BOT_TOKEN is missing in environment variables!");
  process.exit(1);
}

// ⚡ Render-safe polling config
const bot = new TelegramBot(TOKEN, {
  polling: {
    interval: 1000,
    autoStart: true
  }
});

console.log("🤖 Parena bot started...");

// =====================
// 🟢 START COMMAND
// =====================
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    "👋 Welcome to Parena!\n\nChoose an option below:",
    {
      reply_markup: {
        keyboard: [
          ["📊 Open App", "📈 Leaderboard"],
          ["🎮 Matches", "ℹ️ Help"]
        ],
        resize_keyboard: true
      }
    }
  );
});

// =====================
// 📊 OPEN APP
// =====================
bot.onText(/📊 Open App/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "🚀 Open Parena:\nhttps://dapper-raindrop-532f03.netlify.app"
  );
});

// =====================
// 📈 LEADERBOARD
// =====================
bot.onText(/📈 Leaderboard/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "🏆 Leaderboard is live inside the app.\nOpen Mini App to view rankings."
  );
});

// =====================
// 🎮 MATCHES
// =====================
bot.onText(/🎮 Matches/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "⚽ Matches are available inside the Parena app."
  );
});

// =====================
// ℹ️ HELP
// =====================
bot.onText(/ℹ️ Help/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "ℹ️ Parena Bot Commands:\n\n" +
      "/start - Start bot\n" +
      "📊 Open App - Open Mini App\n" +
      "📈 Leaderboard - View rankings\n" +
      "🎮 Matches - View matches"
  );
});

// =====================
// ❓ FALLBACK (SAFE)
// =====================
bot.on("message", (msg) => {
  const text = msg.text;

  const allowed = [
    "/start",
    "📊 Open App",
    "📈 Leaderboard",
    "🎮 Matches",
    "ℹ️ Help"
  ];

  if (!allowed.includes(text)) {
    bot.sendMessage(msg.chat.id, "❓ Unknown command. Type /start");
  }
});
