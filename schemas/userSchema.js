import Joi from "joi";

export const registerSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string(),
}).options({ abortEarly: false });

export const emailSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .error(new Error("missing required field email")),
});

export const loginSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string(),
}).options({ abortEarly: false });

export const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
}).options({ abortEarly: false });

export const updateAvatarSchema = Joi.object({
  avatarURL: Joi.string()
    .required()
    .error(new Error("Avatar is a required field")),
});
