'use strict';

var _consts = require('./consts');

var token = process.env.TOKEN;

var Bot = require('node-telegram-bot-api');

var bot = void 0;

if (process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
} else {
  bot = new Bot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

bot.onText(/\/start/, function (msg) {
  var name = msg.from.first_name;
  bot.sendMessage(msg.chat.id, 'Hello there ' + name + '! ' + _consts.WELCOME_MESSAGE);
});

// bot.on('message', (msg) => {
//   const name = msg.from.first_name;
//   bot.sendMessage(msg.chat.id, 'Hello, ' + name + '!').then(() => {
//     console.log("I said hello!")
//   });
// });

module.exports = bot;
//# sourceMappingURL=bot.js.map