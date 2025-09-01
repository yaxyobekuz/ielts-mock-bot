const BOT_TOKEN = process.env.BOT_TOKEN;
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(BOT_TOKEN, { polling: true });
module.exports = bot;
