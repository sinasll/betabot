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

console.log("🤖 Parena bot started seamlessly...");

// =====================
// 🟢 START COMMAND
// =====================
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    "✨ *Welcome to Parena.*\n\nYour premier destination for competitive tracking and match insights. Please select an option from the menu below to begin your journey.",
    {
      parse_mode: "Markdown",
      reply_markup: {
        keyboard: [
          ["📊 Launch App", "📈 Leaderboard"],
          ["🎮 Live Matches", "ℹ️ Assistance"]
        ],
        resize_keyboard: true
      }
    }
  );
});

// =====================
// 📊 LAUNCH APP
// =====================
bot.onText(/📊 Launch App/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "🚀 *Initializing Parena Mini App...*\n\nPlease use the official application interface to access your dashboard and personalized features.",
    { parse_mode: "Markdown" }
  );
});

// =====================
// 📈 LEADERBOARD
// =====================
bot.onText(/📈 Leaderboard/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "🏆 *Global Rankings*\n\nThe competitive leaderboard is updated in real-time. You can view the complete player rankings directly inside the Parena dashboard.",
    { parse_mode: "Markdown" }
  );
});

// =====================
// 🎮 LIVE MATCHES
// =====================
bot.onText(/🎮 Live Matches/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "⚽ *Match Center*\n\nAll active schedules, ongoing fixtures, and historical match data are hosted securely within the main platform.",
    { parse_mode: "Markdown" }
  );
});

// =====================
// ℹ️ ASSISTANCE
// =====================
bot.onText(/ℹ️ Assistance/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "📋 *Directory Guide*\n\n" +
      "Use the menu buttons below or the quick commands to navigate:\n\n" +
      "• `/start` — Restart directory services\n" +
      "• `📊 Launch App` — Access the application\n" +
      "• `📈 Leaderboard` — Standings & analytics\n" +
      "• `🎮 Live Matches` — Match dynamic centers",
    { parse_mode: "Markdown" }
  );
});

// =====================
// ❓ FALLBACK (SAFE)
// =====================
bot.on("message", (msg) => {
  const text = msg.text;

  const allowed = [
    "/start",
    "📊 Launch App",
    "📈 Leaderboard",
    "🎮 Live Matches",
    "ℹ️ Assistance"
  ];

  // Safely ignore command text checks if it's undefined
  if (text && !allowed.includes(text)) {
    bot.sendMessage(
      msg.chat.id,
      "⚡ *Command Not Recognized.*\n\nPlease utilize the menu options below or type `/start` to return to the main interface.",
      { parse_mode: "Markdown" }
    );
  }
});
