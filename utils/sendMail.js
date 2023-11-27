import nodemailer from 'nodemailer';
import { emailHost,fromEmail,fromPassword,emailPort,emailSecure } from '../config/sconfig.js';

let transporterInfo = {
    host : emailHost,
    port : emailPort,
    secure : emailSecure,
    auth : {
        user : fromEmail,
        pass : fromPassword
    }
}

export let sendMail = async(mailInfo) => {
    try{
        let transporter = nodemailer.createTransport(transporterInfo)
        let info = await transporter.sendMail(mailInfo)
        return info;
    } catch(error){
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send email');
    }
}