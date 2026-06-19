const { Telegraf } = require('telegraf');

// لێرە توکێنا بۆتێ خوە ژ @BotFather وەرگرە
const bot = new Telegraf('YOUR_TELEGRAM_BOT_TOKEN');

// سڵاڤکرن و دەستپێک
bot.start((ctx) => {
    ctx.reply('سڵاڤ! بخێر بێن بۆ یارییا IMPOSTER.\n' +
              'دێ چەوا یاریێ کەی؟\n' +
              '/start - دەستپێکرنا یاریێ\n' +
              '/help - چەوانیا یاریێ\n' +
              '/score - ڕێزبەندییا خالان');
});

// چەوانیا یاریێ
bot.command('help', (ctx) => {
    ctx.reply('یاسا سادەنە:\n' +
              '١. هەر کەسەک دێ پەیڤەکێ وەرگریت، ژبلی فێلبازی.\n' +
              '٢. ب نۆرە وەسف بکەن.\n' +
              '٣. فێلباز دێ هەول دەت خۆ ڤەشێریت.\n' +
              '٤. د کۆتاییێ دا دەنگ بدەن بۆ فێلبازی!');
});

// وەرگرتنا ئاستێ خالان
bot.command('score', (ctx) => {
    // لێرە دێ شیای خالێن د Store.js دا هەیین بخوینی
    ctx.reply('هێشتا چ خال نینن، یاریێ دەستپێبکە داکو ناڤێ تە بچیتە د لیستێ دا!');
});

// وەرگرتنا فرمانێن یاریێ
bot.command('play', (ctx) => {
    ctx.reply('یاری دهێتە ئامادەکرن... ئەرێ تو دگەل ستافێ دهۆکێ یە؟');
});

bot.launch();

// بۆ راوەستاندنا بۆتی ب سەلامەتی
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

console.log('بۆتێ IMPOSTER ب بادینی دەستپێکر...');
