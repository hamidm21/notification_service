const db = require('../utils/db');
const jmoment = require('moment-jalaali');

const ContactEmail = db.Schema({
	isRead: {
		type: Boolean,
		required: true,
		default: false,
	},
	title: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	mail: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true,
	},
	is_moral: {
		type: Boolean,
		default: false
	},
	is_closed: {
		type: Boolean,
		default: false
	},
	is_registered: {
		type: Boolean,
		default: false
	},
	moment: {
		type: String,
		required: true,
		default: jmoment().format('jYYYY/jMM/jDD HH:mm:ss')
	}
});


const OpinionEmail = db.Schema({
	isRead: {
		type: Boolean,
		required: true,
		default: false,
	},
	psychologist_id: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	mail: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true,
	},
	is_moral: {
		type: Boolean,
		default: false
	},
	is_closed: {
		type: Boolean,
		default: false
	},
	is_registered: {
		type: Boolean,
		default: false
	},
	moment: {
		type: String,
		required: true,
		default: jmoment().format('jYYYY/jMM/jDD HH:mm:ss')
	}
});

ContactEmail.statics.saveEmailNotification = function (title, name, mail, text){

	const email_notification = new this({
		title,
		name,
		mail,
		text
	});

	return email_notification.save();
};


OpinionEmail.statics.saveEmailNotification = function (title, name, mail, text, psychologist_id){

	const email_notification = new this({
		title,
		name,
		mail,
		text,
		psychologist_id
	});

	return email_notification.save();
};

exports.ContactEmail = db.model('contact_email_model', ContactEmail);
exports.OpinionEmail = db.model('opinion_email_model', OpinionEmail);