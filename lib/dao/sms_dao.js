const db = require('../utils/db');
const jmoment = require('moment-jalaali');

const SmsNotification = db.Schema({
	messageid: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	},
	status: {
		type: Number,
		required: true
	},
	statustext: {
		type: String,
		required: true
	},
	sender: {
		type: String,
		required: true
	},
	receptor: {
		type: String,
		required: true
	},
	date: {
		type: Number,
		required: true
	},
	cost: {
		type: Number,
		required: true
	},
	moment: {
		type: String,
		required: true,
		default: jmoment().format('jYYYY/jMM/jDD HH:mm:ss')
	},
});


SmsNotification.statics = {

	saveSmsNotification : function (messageid, message, status, statustext, sender, receptor, date, cost){

		const email_notification = new this({
			messageid,
			message,
			status,
			statustext,
			sender,
			receptor,
			date,
			cost
		});
    
		return email_notification.save();
	}
    
};


exports.Sms = db.model('sms_notification_model', SmsNotification);