import jwt from "jsonwebtoken";
import path from "path";
import dotenv from "dotenv";
import gravatar from "gravatar";
import { nanoid } from "nanoid";

import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import {
  comparePassword,
  createHashPassword,
} from "../services/hashService.js";
import {
  createUser,
  findUserByEmail,
  findUserByVerificationToken,
  updateSubscription,
  updateToken,
  updateVerify,
  updatingAvatar,
} from "../services/userService.js";
import { removeImage, updateImage } from "../services/fileServices.js";
import { sendEmail } from "../services/emailServices.js";

dotenv.config();

const avatarDir = path.join(process.cwd(), "public", "avatars");

export const register = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await createHashPassword(password);

  const avatarURL = gravatar.url(email, { s: "100", r: "x", d: "retro" }, true);

  const verificationToken = nanoid();

  const newUser = await createUser({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    email,
    subject: "Verify email",
    html: `<a target="_blank" href="${process.env.BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
});

export const verifyEmail = catchAsync(async (req, res) => {
  const { verificationToken } = req.params;

  const user = await findUserByVerificationToken(verificationToken);

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await updateVerify(user._id);

  res.status(200).json({ message: "Verification successful" });
});

export const resendVerifyEmail = catchAsync(async (req, res) => {
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    email,
    subject: "Verify email",
    html: `<a target="_blank" href="${process.env.BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({ message: "Verification email sent" });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const { SECRET_KEY } = process.env;

  const user = await findUserByEmail(email);

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email or password is wrong");
  }

  const isPassword = await comparePassword(password, user.password);

  if (!isPassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await updateToken(user._id, token);

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});

export const current = catchAsync(async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
});

export const logout = catchAsync(async (req, res) => {
  const { _id } = req.user;

  await updateToken(_id, null);

  res.sendStatus(204);
});

export const subscriptionUpdate = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  await updateSubscription(_id, subscription);

  res.status(200).json({
    subscription,
  });
});

export const updateAvatar = catchAsync(async (req, res) => {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;

  const destUpload = path.join(avatarDir, filename);

  const avatarURL = path.join("avatars", filename);

  await removeImage(tempUpload, destUpload);

  await updateImage(destUpload);

  await updatingAvatar(_id, avatarURL);

  res.status(200).json({
    avatarURL,
  });
});
