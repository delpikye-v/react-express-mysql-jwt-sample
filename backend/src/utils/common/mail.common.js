// var nodemailer = require('nodemailer');
import nodemailer from 'nodemailer';
import loggerMiddleware from '../../middleware/logger.middleware.js';

const sender = () => {
    const { MAIL_SEND, MAIL_PASS } = process.env;
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: MAIL_SEND,
            pass: MAIL_PASS,
        }
    })
}

const mailOptions = (to, subject, text) => {
    return {
        to: to || 'xxxxxxxxxxxxxxxxxxxx',
        subject: subject || 'Send password: ',
        text: text || 'This is test!',
    };
}

class MailCommon {
    static get transporter() {
        return sender()
    }

    static send(email, subject, text) {
        return new Promise((resvole, reject) => {
            MailCommon.transporter.sendMail(mailOptions(email, subject, text), function (error, info) {
                if (error) {
                    reject({ error: true, cause: error })
                } else {
                    loggerMiddleware.info('Email sent: ' + info.response)
                    resvole({ result: true })
                }
            });
        })
    }
}

export default MailCommon