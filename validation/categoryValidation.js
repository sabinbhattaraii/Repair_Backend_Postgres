import Joi from "joi";

const categorySchemaValidation = Joi.object()
  .keys({
    courseType: Joi.string()
      .regex(/^[a-zA-Z]*$/)
      .min(3)
      .max(30)
      .required()
      .messages({
        "string.pattern.base": "only alphabet are allowed for Course Type.",
        "string.empty": "Enter Your Course Type",
        "any.required": "Course Type is required",
      }),
  })
  .unknown(false);

export default categorySchemaValidation;
