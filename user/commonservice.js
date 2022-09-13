"use strict";
const nodemailer = require('nodemailer');
exports.mail = async function main(email,password) {
    let testAccount = await nodemailer.createTestAccount();
         let transporter = nodemailer.createTransport({
             service: "gmail",
             host: "smtp.gmail.com",
             port: 587,
             secure: false, // true for 465, false for other ports
             auth: {
                 user: 'anushak465355@gmail.com',
                 pass: 'cddufqteyyvgxhat',
             },
         });
         // send mail with defined transport object
         let info = await transporter.sendMail({
             from: 'anushak465355@gmail.com', // sender address
             to: email, // list of receivers
             subject: "Hello ✔", // Subject line
             html: "Your Password is : "+password // plain text body
             // html: "<b>Hello world?</b>", // html body
         });
         console.log("Message sent: %s", info.messageId);
         console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
     }