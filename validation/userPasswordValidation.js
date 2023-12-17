import Joi from "joi";

const userPasswordValidation = Joi.object()
  .keys({
    oldPassword: Joi.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .min(8)
        .max(20)
        .required()
        .messages({
            "string.empty": "OldPassword is required",
            "string.min": "OldPassword must be at least {8} characters long",
            "string.max": "OldPassword must be at most {20} characters long",
            "string.pattern.base": "OldPassword must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
        }),

    password : Joi.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .min(8)
        .max(20)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least {8} characters long",
            "string.max": "Password must be at most {20} characters long",
            "string.pattern.base": "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
        }),
  })
  .unknown(false);

export default userPasswordValidation;
