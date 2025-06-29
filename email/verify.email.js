import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();

async function SendVerificationEmail(toEmail, verificationCode) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.ORG_EMAIL,
            pass: process.env.ORG_PASS,
        }
    });
    const mailOptions = {
        from: `${process.env.ORG_EMAIL}`,
        to: toEmail,
        subject: "Verify your email",
        html: `<p>Donot Share this code.Donot do anything and ignore if you did not send a request for it The verification code is</p><a href = "verification code"  ${verificationCode}</a>`,

    };
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent : " + info.response);
}