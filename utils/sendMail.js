import nodemailer from 'nodemailer';
import { emailHost,fromEmail,fromPassword,emailPort } from '../config/sconfig.js';

let transporterInfo = {
    host : emailHost,
    port : 587,
    secure : true,
    tls: {
        rejectUnauthorized: false,  // Disable certificate validation (not recommended in production)
      },
    auth : {
        user : fromEmail,
        pass : fromPassword,
    },
}

export let sendMail = async(mailInfo) => {
    try{
        let transporter = nodemailer.createTransport(transporterInfo)
        let info = await transporter.sendMail(mailInfo)
        return info;
    } catch(error){
        console.error('Error sending email:', error.message);
        throw Error('Failed to send email');
    }
}