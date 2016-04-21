'use strict';

const MSG_TPL = 
`*%s*
%s
_%s_
%s`;

var util = require('util');

class Post {
	constructor(psto) {
		this.id = psto.id;
		this.date = new Date(psto.date);
		this.title = psto.title;
		this.tiser = psto.tiser;
		this.author = psto.author;
		this.comments_count = psto.comments_count;
		this.ptaags = psto.ptaags;
	}

	getMessage() {
		let ptaagsText = '';

		this.ptaags.forEach(ptaag => {
			ptaagsText += ' #' + ptaag;
		});

		return util.format(MSG_TPL, this.title, this.tiser, ptaagsText, this.author);
	}
}

module.exports = Post;