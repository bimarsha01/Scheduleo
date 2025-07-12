import Joi from "joi";

export const bookingValidationSchema = Joi.object({
    serviceId: Joi.string().required(),
    categoryId: Joi.string().required(),
    date: Joi.date().iso().required(),
    time: Joi.string().required(),
    description: Joi.string().min(10).required(),
    occasion: Joi.string().optional(),
    phoneno: Joi.string().pattern(/^[0-9]{7,15}$/).required(),
    noofPeople: Joi.string().min(1).max(7).required()
});
