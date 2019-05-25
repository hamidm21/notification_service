// const kave = require('kavenegar');
const config = require('../config/config');
// const api = kave.KavenegarApi({
// 	apikey: config.KAVE_API
// });
const log = require('debug')('notify:kavenegar');
const request = require('request-promise');

exports.sendSMS = async (phone_number, template, ...args) => {
	switch (template) {
	case 'goftarenewuser':
		log({phone_number, template, 'first param': args[0]});
		return await request({
			uri: config.KAVE_URL,
			method: 'POST',
			form: {
				receptor: phone_number,
				template,
				token: args[0].split(' ').join('_')
			}
		});
	case 'goftarebuysubscribe1':
		log({'goftarebuysubscribe1': true})
		return await request({
			uri: config.KAVE_URL,
			method: 'POST',
			form: {
				receptor: phone_number,
				template,
				token: args[0].split(' ').join('_'),   // type
				token2: args[1].split(' ').join('_'), // username
				token3: args[2].split(' ').join('_') // subscribe_type
			}
		});
	default:
		break;
	}
};