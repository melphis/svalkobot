'use strict';

var users = [];

class Cache {
	constructor() {
	}

	findUserById(id) {
		return users.find(
			user => user.id === id
		);
	}

	addUser(user) {
		users.push(user);
	}
}

module.exports = Cache;