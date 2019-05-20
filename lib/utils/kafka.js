const config = require('../config/config');
const kafka_log = require('debug')('notify:kafka');
const error_log = require('debug')('notify:error');
const kafka = require('kafka-node');
const km = require('kafka-node').KeyedMessage;
const Client = new kafka.KafkaClient({
	kafkaHost: config.KAFKA_HOST
});
const Producer = require('kafka-node').Producer;
const producer = new Producer(Client, config.PRODUCER_CONFIG);


producer.on('ready' , ()=> {
	kafka_log('kafka producer is up and running');
});

producer.on('error' , e => {
	error_log(`kafka producer has errors -----> ${e}`);
});


exports.producer = producer;
exports.client = Client;
exports.km = km;