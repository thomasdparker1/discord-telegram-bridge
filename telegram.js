const TelegramBot = require('node-telegram-bot-api');
const webhook = require('discord-webhook-node');
const Discord = require('discord.js');
const client = new Discord.Client();

// Initial Info
const hook = new webhook.Webhook("Discord Webhook URL"); // Go to channel setting on a discord server and make a new webhook
const telegramToken = 'Telegram Token'; // Get this from botfather
const discordToken = 'Discord Token' // Get this from discord developer site
const bot = new TelegramBot(telegramToken, {polling: true});
let chatId = 'chat ID' // After you setup the tokens, send a message and it will print out the telegram chat ID.

client.on('message', msg => {

    let name = msg.author.username + '#' + msg.author.discriminator

    console.log(msg.content) // Optional, prints out every message from both servers

    if (name !== 'webhookname#0000' || name !== 'webhookname#0000') { // Change this to the name of your webhook so it doesnt make an infinite loop of messages
        bot.sendMessage(chatId, '<b>' + name + '</b>\n' + msg.content, {parse_mode: "HTML"})
    }

});

bot.on('message', (msg, match) => {

    let chatId = msg.chat.id;
    const message = msg.text;
    let username = msg.from.username;

    if (username === undefined) {
        username = msg.from.first_name
    }

    //console.log(chatId) // Feel free to remove this after you get the Chat ID for telegram

    // Prevents messages from sending if they are blank (ex. Images)
    if (message !== undefined) {
        hook.send('**' + username + "**:\n" + message);
    }

});

// Print errors from telegram
bot.on('polling_error', (error) => {
    console.log(error.code);  // => 'EFATAL'
});

// Initiates Discord Bot
client.login(discordToken);
