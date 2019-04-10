const kave = require('../handlers/kavenegar_handler');
const validator = require('../utils/validator');
const Sms = require('../dao/sms_dao').Sms;
const log = require('debug')('notify_servie:controller:sms');
const elog = require('debug')('notify_servie:error:controller:sms');


exports.registerSms = async message => {
	const msg = JSON.parse(message);
	try {
		const valid = validator.joi.validate(msg, validator.registerSms);
		if (valid.error) {
			elog({
				'validation failed for registerSms': valid.error
			});
		} else {
			const result = await kave.sendSMS(msg.phone_number, msg.template, msg.username);
			if (result.return.status === 200) {
				await Sms.saveSmsNotification(result.messageid, result.message, result.status,
					result.statustext, result.sender, result.receptor,
					result.date, result.cost);
				log({
					'sms is sent': result
				});
			} else {
				elog({
					'error in transactionSms': result
				});
				throw new Error('error in transactionSms');
			}
		}
	} catch (e) {
		elog({'error in register sms': e}); 
	}
};

exports.transactionSms = async message => {
	const msg = JSON.parse(message);
	try {
		const valid = validator.joi.validate(msg, validator.transactionSms);
		if (valid.error) {
			elog({
				'validation failed for registerSms': valid.error
			});
		} else {
			const result = await kave.sendSMS(msg.phone_number, msg.template, msg.type, msg.username, msg.subscribe_type);
			if (result.return.status === 200) {
				await Sms.saveSmsNotification(result.messageid, result.message, result.status,
					result.statustext, result.sender, result.receptor,
					result.date, result.cost);
				log({
					'sms is sent': result
				});
			} else {
				elog({
					'error in transactionSms': result
				});
				throw new Error('error in transactionSms');
			}
		}
	} catch (e) {
		elog({'error in register sms': e}); 
	}
};