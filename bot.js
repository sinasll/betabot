const { Telegraf } = require('telegraf');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('بۆتێ IMPOSTER یێ ساخە! 🚀');
});

app.listen(PORT, () => {
  console.log(`سێرڤەر ل سەر پۆرتێ ${PORT} دەستپێکر`);
});

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error('❌ خەلەتی: BOT_TOKEN د ناڤ Environment Variables دا نەیێ هەیە!');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

// ٣. تەنێ بەرسڤدانا فرمانا /start ب زمانێ بادینییا دهۆکێ
bot.start((ctx) => {
  ctx.reply(
    'سڵاڤ، بخێر بێی بۆ یارییا فێلباز\n\n' +
    'یا ب زمانێ کوردی هاتییە دروستکرن\n\n' +
    'بکە (ل خوارێ کلیکێ ل سەر دوگمەیا (یاریێ بکە\n' +
  );
});

bot.launch()
  .then(() => {
    console.log('بۆتێ IMPOSTER ب بادینی ل سەر Render دەست ب کار بوو! ✅');
  })
  .catch((err) => {
    console.error('خەلەتی د دەستپێکرنێ دا:', err);
  });

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
