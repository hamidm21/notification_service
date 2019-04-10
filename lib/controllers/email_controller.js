const ContactEmail = require('../dao/email_dao').ContactEmail;
const OpinionEmail = require('../dao/email_dao').OpinionEmail;
const config = require('../config/config');
const log_email = require('debug')('goftare:email');
const nodemailer = require('nodemailer');

exports.contactUs = async (req, res, next)=> {
	const {email, subject, text, username} = req.body;
	try{
		if(email , subject, text, username){
			const transaporter = nodemailer.createTransport(config.transport);
			const sent = transaporter.sendMail(Object.assign({}, config.options, {
				to: email,
				subject: subject,
				text: text
			}));
			if(sent){
				const saved = ContactEmail.saveEmailNotification(subject, username, email, text);
				if(saved){
					log_email(saved);
					res.json(Object.assign({}, req.base, {
						message: 'email has been sent and saved succesfully',
						data: saved
					}));
				}else{
					res.status(500).json(Object.assign({}, req.base, {
						result: false,
						message: 'email is not saved'
					}));
				}
			}else{
				res.status(500).json(Object.assign({}, req.base, {
					result: false,
					message: 'email is not sent'
				}));
			}
		}else
			res.status(500).json(Object.assign({}, req.base, {
				result: false,
				message: 'empty'
			}));
	}catch(e){
		next(new Error(`Error in sendEmailToClient controller ${e}`));
	}
};

exports.opinionPsychologist = async (req, res, next)=> {
	const {email, subject, text, username, psychologist_id} = req.body;
	try{
		if(email , subject, text, username){
			const transaporter = nodemailer.createTransport(config.transport);
			const sent = transaporter.sendMail(Object.assign({}, config.options, {
				to: email,
				subject: subject,
				text: text,
			}));
			if(sent){
				const saved = OpinionEmail.saveEmailNotification(subject, username, email, text, psychologist_id);
				if(saved){
					log_email(saved);
					res.json(Object.assign({}, req.base, {
						message: 'email has been sent and saved succesfully',
						data: saved
					}));
				}else{
					res.status(500).json(Object.assign({}, req.base, {
						result: false,
						message: 'email is not saved'
					}));
				}
			}else{
				res.status(500).json(Object.assign({}, req.base, {
					result: false,
					message: 'email is not sent'
				}));
			}
		}else
			res.status(500).json(Object.assign({}, req.base, {
				result: false,
				message: 'empty'
			}));
	}catch(e){
		next(new Error(`Error in sendEmailToClient controller ${e}`));
	}
};