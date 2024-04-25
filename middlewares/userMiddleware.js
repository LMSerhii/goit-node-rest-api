import validateBody from "../helpers/validateBody.js";
import {
  emailSchema,
  loginSchema,
  registerSchema,
  subscriptionSchema,
  updateAvatarSchema,
} from "../schemas/userSchema.js";

export const validateRegisterUser = (req, res, next) => {
  validateBody(registerSchema)(req, res, next);
};

export const validateLoginrUser = (req, res, next) => {
  validateBody(loginSchema)(req, res, next);
};

export const validateSubscriptionUser = (req, res, next) => {
  validateBody(subscriptionSchema)(req, res, next);
};

export const validateAvatarUser = (req, res, next) => {
  validateBody(updateAvatarSchema)(req, res, next);
};

export const validateVerifyUser = (req, res, next) => {
  validateBody(emailSchema)(req, res, next);
};
