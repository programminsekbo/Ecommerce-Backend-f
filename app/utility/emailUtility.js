import nodemailer from "nodemailer";
import {EMAIL_HOST, EMAIL_PASS, EMAIL_PORT, EMAIL_SECURITY, EMAIL_USER} from "../config/config.js";

const SendEmail=async(EmailTo,EmailText,EmailSubject)=>{


    let transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port:EMAIL_PORT,
        secure: EMAIL_SECURITY,
        service:"gmail",
        auth:{
            user: EMAIL_USER,
            pass: EMAIL_PASS
        },
        tls:{
            rejectUnauthorized: false
        }
    })

    let mailOptions = {
        from:'PlainB E-commerce Website <rkrafikridoy5887@gmail.com>',
        to:EmailTo,
        subject:EmailSubject,
        text:EmailText
    }


    return await transporter.sendMail(mailOptions)
}

export default SendEmail;