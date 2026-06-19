```js
const { Telegraf } = require('telegraf');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Health check
app.get('/', (req, res) => {
  res.send('بۆتێ IMPOSTER یێ ساخە! 🚀');
});

app.listen(PORT, () => {
  console.log(`سێرڤەر ل سەر پۆرتێ ${PORT} دەستپێکر`);
});

// Telegram Bot Token
const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error('❌ خەلەتی: BOT_TOKEN د Environment Variables دا نەهاتیە دانان!');
  process.exit(1);
}

// Create bot
const bot = new Telegraf(BOT_TOKEN);

// Start command
bot.start((ctx) => {
  ctx.reply(`سڵاڤ، بخێر بێی بۆ یارییا فێلباز

یا ب زمانێ کوردی هاتییە دروستکرن

ل خوارێ کلیک بکە ل سەر دوگمەیا "یاریێ بکە"`);
});

// Launch bot
bot.launch()
  .then(() => {
    console.log('بۆتێ IMPOSTER ب سەرکەفتی دەست ب کار بوو! ✅');
  })
  .catch((err) => {
    console.error('خەلەتی د دەستپێکرنا بۆتێ دا:', err);
  });

// Graceful shutdown
process.once('SIGINT', () => {
  bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
  bot.stop('SIGTERM');
});
```
