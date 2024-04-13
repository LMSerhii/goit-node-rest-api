import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import {
  comparePassword,
  createHashPassword,
} from "../services/hashService.js";
import { createUser, findUserByEmail } from "../services/userService.js";

import dotenv from "dotenv";

dotenv.config();

export const register = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await createHashPassword(password);

  const newUser = await createUser({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const { SECRET_KEY } = process.env;

  const user = await findUserByEmail(email);

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const isPassword = await comparePassword(password, user.password);

  if (!isPassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});
