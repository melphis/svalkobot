'use strict';

const TOKEN = '129617973:AAERTxxSuzpFpq_qQfOYq1Q6lYRAg1rko9E';

var TelegramBot = require('node-telegram-bot-api'),
	Colors = require('colors/safe'),
// request = require('request'),
	Svalko = require('svalko-api'),
	User = require('./src/user'),
	Cache = require('./src/cache'),
	Post = require('./src/post');

var svalko = new Svalko(),
	cache = new Cache(),
	bot = new TelegramBot(TOKEN, {polling: true});

console.log(Colors.red.underline('Бот запущен'));

function getUser(id) {
	let user = cache.findUserById(id);

	if (!user) {
		user = new User(id);
		cache.addUser(user);
	}

	return user;
}

bot.onText(/\/last/, (msg, match) => {
	let user = getUser(msg.chat.id);

	// TODO: Обработка несольких постов
	svalko.loadGlagne(1, user.lastReadPstoDate)
		.then(pstos => {
			pstos.forEach(psto => {
				let post = new Post(psto);
				bot.sendMessage(msg.chat.id, post.getMessage(), {parse_mode: 'Markdown'});
			});
		})
		.catch(e => console.error(e.stack));

	user.updateDate();
});