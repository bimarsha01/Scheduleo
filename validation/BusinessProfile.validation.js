import joi from 'joi'

export const BusinessProfileValidation = joi.object(
    {
        buinessName: joi.string().required(),
        category: joi.string().valid('restro', 'hotel', 'clinic', 'salon').required(),
        location: joi.string().required(),
        working: joi.object({
            opening: joi.date().required(),
            closing: joi.date().required,
            off: joi.string()
        }),
        services: joi.array().items(joi.string()).min(1)
    }
)