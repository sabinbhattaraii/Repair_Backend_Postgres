import Joi from "joi";

const loginSchemaValidation = Joi.object()
  .keys({
    email: Joi.string()
      .regex(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/)
      .required()
      .messages({
        "string.pattern.base": "Enter a valid email.",
        "string.empty": "Enter Your Email",
        "any.required": "Email is required",
      }),

    password: Joi.string()
      .required()
      .min(8)
      .max(20)
      .pattern(
        new RegExp(
            "^(?=.*[!@#$%^&*()_+{}\\[\\]:;<>,.?~\\-])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,20}$"        )
      )
      .messages({
        "string.pattern.base":
          "Password must have at least one special character, at least one number, at least one uppercase letter, at least one lowercase letter, a minimum length of eight characters, and a maximum length of twenty characters.",
        "string.empty": "Enter Your Password",
        "any.required": "Password is required",
      }),
  })
  .unknown(false);

export default loginSchemaValidation;
