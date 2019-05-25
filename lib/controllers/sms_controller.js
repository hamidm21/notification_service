const kave = require('../handlers/kavenegar_handler');
const validator = require('../utils/validator');
const Sms = require('../dao/sms_dao').Sms;
const log = require('debug')('notify:controller:sms');
const elog = require('debug')('notify:error:controller:sms');


exports.registerSms = async message => {
	const msg = JSON.parse(message.value);
	try {
		const valid = validator.joi.validate(msg, validator.registerSms);
		if (valid.error) {
			elog({
				'validation failed for registerSms': valid.error
			});
		} else {
			const result = JSON.parse(await kave.sendSMS(msg.phone_number, msg.template, String(msg.username)));
			await Sms.saveSmsNotification(result.entries[0].messageid, result.entries[0].message, result.return.status,
				result.entries[0].statustext, result.entries[0].sender, result.entries[0].receptor,
				result.entries[0].date, result.entries[0].cost, message.highWaterOffset);
			log({
				'sms is sent': result
			});
		
		}
	} catch (e) {
		elog({'error in register sms': e}); 
	}
};

exports.transactionSms = async message => {
	const msg = JSON.parse(message.value);
	try {
		const valid = validator.joi.validate(msg, validator.transactionSms);
		if (valid.error) {
			elog({
				'validation failed for registerSms': valid.error
			});
		} else {
			const result = JSON.parse(await kave.sendSMS(msg.phone_number, msg.template, msg.type, String(msg.username), msg.subscribe_title));
				await Sms.saveSmsNotification(result.entries[0].messageid, result.entries[0].message, result.return.status,
					result.entries[0].statustext, result.entries[0].sender, result.entries[0].receptor,
					result.entries[0].date, result.entries[0].cost, message.highWaterOffset);
				log({
					'sms is sent': result
				});
		}
	} catch (e) {
		elog({'error in register sms': e}); 
	}
};