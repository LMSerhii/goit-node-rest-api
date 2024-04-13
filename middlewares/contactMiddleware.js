import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/HttpError.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";

export const validateCreateContact = (req, res, next) => {
  validateBody(createContactSchema)(req, res, next);
};

export const validateUpdateContact = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next(HttpError(400, "Body must have at least one field"));
    return;
  }

  validateBody(updateContactSchema)(req, res, next);
};

export const validateUpdateFavorite = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next(HttpError(400, "Body must have at least one field"));
    return;
  }

  validateBody(updateFavoriteSchema)(req, res, next);
};

export const handleContactNotFound = (req, res, next) => {
  const { status, message } = HttpError(404);
  return res.status(status).json({ message });
};

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  console.log(req.params);

  if (!isValidObjectId(contactId)) {
    next(HttpError(400, `${contactId} is not valid id`));
  }

  next();
};
