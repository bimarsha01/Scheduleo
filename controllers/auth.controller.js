import { CustomerModel } from '../models/users.model.js'
import bcrypt from 'bcryptjs'
// import { Signinvalidation, Signupvalidation } from '../validation/validateUser.validation.js'
import createStatus from 'http-status-codes'
import { attachedcookiesToResponse } from '../cookies/cookie.cookies.js'
import { SendVerificationEmail } from '../email/verify.email.js'
import joi from 'joi';
import { Signupvalidation, Signinvalidation } from '../validation/validateUser.validation.js'
// import { verifycode } from '../email/verify.email.js'

export const signuphandler = async (req, res, next) => {
    try {
        const { error } = Signupvalidation.validateAsync(req.body);
        if (error)
            return res.status(createStatus.BAD_GATEWAY).json({
                success: false,
                Error: "Validation Error"
            })

        const { name, email, password, phoneNo } = req.body;
        const existingUser = await CustomerModel.findOne({ email: email });

        if (existingUser)
            return res.status(createStatus.BAD_GATEWAY).json({
                success: false,
                message: "Email already exists"
            });

        const hash = await bcrypt.genSalt(10);
        const hashpw = await bcrypt.hash(password, hash);

        const EmailintoLowerCase = email.toLowerCase();
        const newUser = new CustomerModel({
            name: name,
            email: EmailintoLowerCase,
            password: hashpw,
            phoneNo: phoneNo
        });
        if (newUser !== undefined || null) {
            // const created = newUser.save();
            // console.log(created);

            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

            newUser.verificationToken = verificationCode;
            newUser.VerificationExpiry = new Date(Date.now() + 10 * 60 * 1000);
            await newUser.save();

            await SendVerificationEmail(newUser.email, verificationCode);

            res.status(202).json({
                success: true,
                message: "Verification email sent. Please check your inbox."
            });

            return res.status(createStatus.ACCEPTED).json({
                success: true,
                message: "New user has been created"

            })
        }
        else {
            return res.status(createStatus.BAD_REQUEST).json({
                success: false,
                message: "Something went wrong"
            });
        }
    } catch (err) {
        return res.status(createStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: `Internal server error: ${err}`
        })
    }
}

export const signinhandler = async (req, res, next) => {
    const { error } = await Signinvalidation.validateAsync(req.body);

    if (error)
        return res.status(403).json({
            success: false,

            message: "Pleasr fill out the form properly"
        })

    const { email, password } = req.body;
    if (!email || !password)
        return res.status(createStatus.BAD_REQUEST).json({
            success: false,

            message: "please fill out the required form "
        })
    const checkEmail = await CustomerModel.aggregate([
        {
            match: { email: email }
        }
    ])
    if (!checkEmail)
        return res.status(createStatus.BAD_GATEWAY).json({
            success: false,
            message: "Email does not match"
        });

    const checkemail = await CustomerModel.findOne({ email: email });
    const checkpw = await bcrypt.compare(password, checkemail.password);
    const tokenUser = {
        UserId: checkemail._id,
        name: checkemail.name,
        role: checkemail.role
    }

    await attachedcookiesToResponse({ res, user: tokenUser });
    return res.status(createStatus.OK).json({
        success: true,
        message: `${checkemail.name} has been successfully logged in`,
        data: {
            checkemail
        }
    })


}