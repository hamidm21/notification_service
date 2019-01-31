const db = require('../utils/db');
const jmoment = require('moment-jalaali');

const EmailNotification = db.Schema({
	isRead: {
		type: Boolean,
		required: true,
		default: false,
	},
	contact_title: {
		type: String,
		required: true,
	},
	contact_name: {
		type: String,
		required: true,
	},
	contact_mail: {
		type: String,
		required: true
	},
	contact_text: {
		type: String,
		required: true,
	},
	contact_is_moral: {
		type: Boolean,
		default: false
	},
	contact_is_closed: {
		type: Boolean,
		default: false
	},
	contact_is_registered: {
		type: Boolean,
		default: false
	},
	moment: {
		type: String,
		required: true,
		default: jmoment().format('jYYYY/jMM/jDD HH:mm:ss')
	},
});


EmailNotification.statics.saveEmailNotification = function (contact_title, contact_name, contact_mail, contact_text){

	const email_notification = new this({
		contact_title,
		contact_name,
		contact_mail,
		contact_text
	});

	return email_notification.save();
};


exports.Email = db.model('email_notification_model', EmailNotification);