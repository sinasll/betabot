const { Telegraf } = require('telegraf');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('IMPOSTER bot is running!');
});

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
});

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error('ERROR: BOT_TOKEN is missing from environment variables!');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
    'Welcome to IMPOSTER!\n\n' +
    'This bot was created for your game.\n\n' +
    'Tap the button below to play.'
  );
});

bot.launch()
  .then(() => {
    console.log('IMPOSTER bot started successfully!');
  })
  .catch((err) => {
    console.error('Bot launch error:', err);
  });

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
