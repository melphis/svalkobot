'use strict';

const TOKEN = '129617973:AAERTxxSuzpFpq_qQfOYq1Q6lYRAg1rko9E';

var TelegramBot = require('node-telegram-bot-api'),
	Colors = require('colors/safe'),
	// request = require('request'),
	Svalko = require('svalko-api'),
	User = require('./user'),
	Cache = require('./cache');

var svalko = new Svalko(),
	cache = new Cache(),
	bot = new TelegramBot(TOKEN, {polling: true});

console.log(Colors.red.underline('Бот запущен'), bot.info);

function getUser(id) {
	let user = cache.findUserById(id);

	if (!user) {
		user = new User(id);
		cache.addUser(user);
	}

	return user;
}

bot.onText(/\/last/, (msg, match) => {
	let user = getUser(msg.from.id);

	svalko.loadGlagne(1, user.lastReadPstoDate)
		.then(pstos => {
			console.error(pstos);
			bot.sendMessage(msg.from.id, pstos);
		});

	user.updateDate();
});