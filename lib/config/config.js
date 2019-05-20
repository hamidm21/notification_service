require('dotenv').config();


const config= {
	PORT: process.env.PORT,
	MONGO_HOST: process.env.MONGO_HOST,
	KAFKA_HOST: process.env.KAFKA_HOST,
	KAVE_API: process.env.KAVE_API,
	KAVE_URL: process.env.KAVE_URL,
	//nodemailer transport config
	transport: {
		service: process.env.SERVICE,
		auth: {
			//credentials for the email address
			user: process.env.MAILER_USER_NAME,
			pass: process.env.MAILER_PASSWORD
		}
	},
	//nodemailer email options
	options: {
		from: process.env.GOFTARE_EMAIL,
		to: '',
		subject: '',
		text: ''
	},
	CONSUMER_CONFIG: {
		groupId: 'goftare_chat', //consumer group id, default `kafka-node-group`
		// Auto commit config
		autoCommit: true,
		autoCommitIntervalMs: 5000,
		// The max wait time is the maximum amount of time in milliseconds to block waiting if insufficient data is available at the time the request is issued, default 100ms
		fetchMaxWaitMs: parseInt(process.env.FETCHMAXWAITMS),
		// This is the minimum number of bytes of messages that must be available to give a response, default 1 byte
		fetchMinBytes: parseInt(process.env.FETCHMINBYTES),
		// The maximum bytes to include in the message set for this partition. This helps bound the size of the response.
		fetchMaxBytes: parseInt(process.env.FETCHMAXBYTES),
		// If set true, consumer will fetch message from the given offset in the payloads
		fromOffset: true,
		// If set to 'buffer', values will be returned as raw buffer objects.
		encoding: process.env.ENCODING,
	},
	PRODUCER_CONFIG: {
		requireAcks: parseInt(process.env.REQUIREACKS),
		ackTimeoutMs: parseInt(process.env.ACKTIMEOUTMS),
		partitionerType: parseInt(process.env.PARTITIONERTYPE)
	},

	PRODUCER_PAYLOAD: {
		topic: process.env.TOPIC,
		messages: [], // multi messages should be a array, single message can be just a string or a KeyedMessage instance
		key: 'message', // string or buffer, only needed when using keyed partitioner
		partition: 0, // default 0
		attributes: 1, // default: 0
		timestamp: Date.now() // <-- defaults to Date.now() (only available with kafka v0.10 and KafkaClient only)
	},

	PAYLOADS: {
		topic: process.env.NOTIFY_TOPIC,
		offset: 857, //default 0
		partition: parseInt(process.env.PARTITION) // default 0
	},

};


module.exports = config;