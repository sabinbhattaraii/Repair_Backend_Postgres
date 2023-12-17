import Joi from "joi";

const userProfileValidation = Joi.object()
    .keys({
        name: Joi.string()
            .regex(/^[a-zA-Z]*$/)
            .min(3)
            .max(30)
            .required()
            .messages({
                "string.pattern.base": "only alphabet are allowed for Name.",
                "string.empty": "Enter Your Name",
                "any.required": "Name is required",
            })
    })
    .unknown(false);


export default userProfileValidation;