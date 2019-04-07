const client = require('../utils/kafka').client;
const producer = require('../utils/kafka').producer;
const km = require('../utils/kafka').km;
const Consumer = require('kafka-node').Consumer;
const config = require('../config/config');
const sms_controller = require('../controllers/sms_controller');
const Message = require('../dao/chat_dao').Message;
const log = require('debug')('notify_service:handler:kafka');
const elog = require('debug')('notify_service:error:handler:kafka');


exports.kafkaInit = async () => {
	const lastOffset = await Message.getLastCommitedOffset();
	log(lastOffset);
	const consumer = new Consumer(client, [Object.assign({}, config.PAYLOADS, {
		offset: lastOffset
	})], config.CONSUMER_CONFIG);
	consumer.on('message', message => {
		log(message);
		switch (message.key) {
		case 'registerSms':
			sms_controller.registerSms(message);
			log('registerSms consumer');
			break;
		case 'transactionSms':
			sms_controller.transactionSms(message);
			log('transactionSms consumer');
			break;
		default:
			elog('consumer recieves a message with no valid key');
			break;
		}
	});
};
