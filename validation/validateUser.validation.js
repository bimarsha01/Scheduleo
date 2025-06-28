import joi from 'joi';

export const Signupvalidation = joi.object(
    {
        name: joi.string().min(4).max(30).required(),
        email: joi.string().email().required(),
        phoneNo: joi.number().required(),
        password: joi.string().required()

    }

)

export const Signinvalidation = joi.object(
    {
        email: joi.string().email().required(),
        password: joi.string().required()
    }
)