import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { catchAsync } from "../helpers/catchAsync.js";
import { findUserById } from "../services/userService.js";
import { getContactById } from "../services/contactsServices.js";

dotenv.config();

const { SECRET_KEY } = process.env;

export const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization
    ? authorization.split(" ")
    : [null, null];

  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
    return;
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await findUserById(id);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized"));
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};

export const verifyOwner = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const contact = await getContactById(contactId);

  if (!contact) return next(HttpError(404, "Contact not found"));

  if (contact.owner.toString() !== owner.toString()) {
    next(HttpError(404));
    return;
  }

  next();
});
