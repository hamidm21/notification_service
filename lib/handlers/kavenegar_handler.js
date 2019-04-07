// const kave = require('kavenegar');
const config = require('../config/config');
// const api = kave.KavenegarApi({
// 	apikey: config.KAVE_API
// });
const request = require('request');

exports.sendSMS = async (phone_number, template, ...args) => {
	switch (template) {
	case 'goftarenewuser':
		request({
			uri: config.KAVE_URL,
			method: 'POST',
			form: {
				receptor: phone_number,
				template,
				token: args[0]
			}
		}, function (err, response, body){
			if(err) {
				Promise.reject(err);
			} else {
				Promise.resolve(body);
			}
		});
		break;
	case 'goftarebuysubscribe1':
		request({
			uri: config.KAVE_URL,
			method: 'POST',
			form: {
				receptor: phone_number,
				template,
				token: args[0],   // type
				token2: args[1], // username
				token3: args[2] // subscribe_type
			}
		});
		break;
	default:
		break;
	}
};