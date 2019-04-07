const joi = require('joi');

exports.registerSms = joi.object().keys({
	phone_number: joi.string().required(),
	// receiver_id: joi.string().required().regex(/^[a-f\d]{24}$/i),
	template: joi.string().required(),
	username: joi.string().required()
});


exports.transactionSms = joi.object().keys({
	phone_number: joi.string().required(),
	// receiver_id: joi.string().required().regex(/^[a-f\d]{24}$/i),
	template: joi.string().required(),
	username: joi.string().required(),
	type: joi.string().required(),
	subscribe_type: joi.string().required()
});

exports.joi = joi;