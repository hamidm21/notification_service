const db = require('../utils/db');
const jmoment = require('moment-jalaali');
const log = require('debug')('notify:dao:sms');

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
	offset: {
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

	saveSmsNotification : function (messageid, message, status, statustext, sender, receptor, date, cost, offset){

		log('saving the message');
		const sms = new this({
			messageid,
			message,
			status,
			statustext,
			sender,
			receptor,
			date,
			cost,
			offset
		});
		log({sms})
		return sms.save();
	},
	getLastCommitedOffset: async function() {
		try {
			const lastMessageWithOffset = await this.find({})
				.sort({
					_id: -1
				}).limit(1);
			if (lastMessageWithOffset) {
				return Promise.resolve(lastMessageWithOffset[0].offset);
			}else 
				return Promise.resolve(1);
		} catch (e) {
			return Promise.reject(e);
		}
	}
    
};


exports.Sms = db.model('sms_notification_model', SmsNotification);