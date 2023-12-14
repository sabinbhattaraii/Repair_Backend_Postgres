import Joi from "joi";
// import { roleEnum } from "../constant/constant.js";

const userSchemaValidation = Joi.object()
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
      }),

    password: Joi.string()
      .regex(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,20}$/)
      .messages({
        "string.pattern.base":
          "Password must have at least one special character, at least one number, at least one uppercase letter, at least one lowercase letter, a minimum length of eight characters, and a maximum length of twenty characters.",
        "string.empty": "Enter Your Password",
        "any.required": "Password is required",
      })

      .required(),

    email: Joi.string()
      .regex(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/)
      .messages({
        "string.pattern.base": "Enter a valid email.",
        "string.empty": "Enter Your Email",
        "any.required": "Email is required",
      })
      .required(),

    // roles: Joi.array()
    //     .items(Joi.string().valid(...Object.values(roleEnum)))
    //     .min(1)
    //     .optional()
    //     .allow("")
    //     .messages({
    //         'any.only': 'Roles must be one of [admin, superAdmin, customer].'
    //     }),
    // // .required(),
  })
  .unknown(false);

export default userSchemaValidation;