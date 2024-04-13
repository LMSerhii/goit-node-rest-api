import Joi from "joi";

export const registerSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string(),
}).options({ abortEarly: false });

export const loginSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string(),
}).options({ abortEarly: false });
