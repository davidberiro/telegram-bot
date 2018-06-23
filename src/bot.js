const token = process.env.TOKEN;

const Bot = require('node-telegram-bot-api');

import { WELCOME_MESSAGE, INITIAL_KEYBOARD } from './consts'

let bot;

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

bot.onText(/\/start/, (msg) => {
  const name = msg.from.first_name;
  bot.sendMessage(msg.chat.id, `Hello there ${name}! ${WELCOME_MESSAGE}`);
  
  bot.sendMessage(msg.chat.id, "Welcome", {
    "reply_markup": {
        "keyboard": INITIAL_KEYBOARD
      }
  });
});

// bot.on('message', (msg) => {
//   const name = msg.from.first_name;
//   bot.sendMessage(msg.chat.id, 'Hello, ' + name + '!').then(() => {
//     console.log("I said hello!")
//   });
// });

module.exports = bot;
