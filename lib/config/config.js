require('dotenv').config();


const config= {
	PORT: process.env.PORT,
	MONGO_HOST: process.env.MONGO_HOST,
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
	}
};


module.exports = config;