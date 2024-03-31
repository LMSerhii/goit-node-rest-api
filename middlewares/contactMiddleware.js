import HttpError from "../helpers/HttpError.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

export const validateCreateContact = (req, res, next) => {
  validateBody(createContactSchema)(req, res, next);
};

export const validateUpdateContact = (req, res, next) => {
  validateBody(updateContactSchema)(req, res, next);
};

export const handleContactNotFound = (req, res, next) => {
  const { status, message } = HttpError(404);
  return res.status(status).json({ message });
};
