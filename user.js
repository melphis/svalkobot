'use strict';

var _id;

function getLastDay() {
	let now = new Date();
	now.setDate(now.getDate() - 1);

	return now;
}

class User {
	set id(value) { _id = value; }
	get id() { return _id; }

	constructor(id) {
		this.id = id;
		this.lastReadPstoId = 0;
		this.lastReadPstoDate = getLastDay();
		this.svalkoNick = null;
	}

	updateDate() {
		this.lastReadPstoDate = new Date();
	}
}

module.exports = User;