const { Telegraf } = require('telegraf');
const express = require('express');

// ۱. دروستکرنا وێب سێرڤەری بۆ هندێ Render بزانێت بۆت یێ کار دکەت
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('بۆتێ IMPOSTER یێ ساخە! 🚀');
});

app.listen(PORT, () => {
  console.log(`سێرڤەر ل سەر پۆرتێ ${PORT} دەستپێکر`);
});

// ۲. وەرگرتنا توکێنێ ژ سێرڤەرێ Render
const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error('❌ خەلەتی: BOT_TOKEN د ناڤ Environment Variables دا نەیێ هەیە!');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

// ٣. تەنێ بەرسڤدانا فرمانا /start ب زمانێ بادینییا دهۆکێ
bot.start((ctx) => {
  ctx.reply(
    'سڵاڤ! بخێر بێی بۆ یارییا فەرمی یا IMPOSTER 🎭\n\n' +
    '📌 **چەوانیا دەستپێکرن و ڤەکرنا یاریێ:**\n\n' +
    '١. ل خوارێ کلیلێ ل سەر دوگمەیا **"Play Game"** یان **"ڤەکرنا یاریێ"** بکە (یا ل تەنیشتا جهێ نڤیسینێ).\n' +
    '٢. مینی ئەپ (Mini App) دێ بۆ تە ڤەبیت.\n' +
    '٣. ناڤێن هەڤالێن خۆ زێدە بکە و ئێکسەر دەست ب کەیف و یاریێ بکەن! 🔥'
  );
});

// دەستپێکرنا بۆتی
bot.launch()
  .then(() => {
    console.log('بۆتێ IMPOSTER ب بادینی ل سەر Render دەست ب کار بوو! ✅');
  })
  .catch((err) => {
    console.error('خەلەتی د دەستپێکرنێ دا:', err);
  });

// ڕاوەستاندنا پاراستی
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
