import validateBody from "../helpers/validateBody.js";
import { loginSchema, registerSchema } from "../schemas/userSchema.js";

export const validateRegisterUser = (req, res, next) => {
  validateBody(registerSchema)(req, res, next);
};

export const validateLoginrUser = (req, res, next) => {
  validateBody(loginSchema)(req, res, next);
};
