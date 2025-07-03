import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { CustomerModel } from '../models/users.model.js';
import Statuscodes from 'http-status-codes'
dotenv.config();

export async function SendVerificationEmail(toEmail, verificationCode) {
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
        html: `
      <p>Do not share this code with anyone. If you did not request this, please ignore.</p>
      <h3>Your verification code is: ${verificationCode}</h3>`



    };
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent : " + info.response);
}

export const verifycode = async (req, res, next) => {
    try {
        const { email, verificationCode } = req.body;

        const Vemail = await CustomerModel.findOne({ email })

        if (!Vemail)
            return res.status(401).json({ error: "something is wrong" });

        if (Vemail.verificationToken !== verificationCode) {
            throw new Error("Verification Token did not matched");
        }

        if (Vemail.VerificationExpiry < new Date())
            return res.status(401).json({ error: "Code has been expired" });

        Vemail.isverified = true;
        Vemail.verificationToken = undefined;
        Vemail.VerificationExpiry = undefined;
        await Vemail.save();
    } catch (err) {
        return res.status(Statuscodes.BAD_REQUEST).json({
            success: false,
            message: `Error: ${err}`
        })
    }
}