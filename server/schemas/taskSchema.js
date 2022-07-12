const Joi = require("joi");

// Sign up validation
const createTaskValidationSchema = Joi.object({
  // createdBy: Joi.string().required().email(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.string().required().valid("High", "Medium", "Low"),
  status: Joi.string()
    .required()
    .valid("To Do", "IN Progress", "Under Review", "Rework", "Completed"),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
});

module.exports = {
  createTaskValidationSchema,
};
