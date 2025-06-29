import { CustomerModel } from '../models/users.model'
import bcrypt from 'bcryptjs'
import { Signinvalidation, Signupvalidation } from '../validation/validateUser.validation'
import createStatus from 'http-status-codes'
import { attachedcookiesToResponse } from '../cookies/cookie.cookies'

export const Signupvalidation = async (req, res, next) => {
    try {
        const { error } = Signupvalidation.validateAsync(req.body);
        if (error)
            return res.status(createStatus.BAD_GATEWAY).json({
                success: false,
                Error: "Validation Error"
            })

        const { name, email, password, phoneNo } = req.body;
        const uniqueEmail = await CustomerModel.aggregate([
            { $match: { email: email } }
        ])
        if (uniqueEmail)
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
            const created = newUser.save();
            console.log(created);
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

export const Signinvalidation = async (req, res, next) => {
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