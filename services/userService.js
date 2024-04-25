import { User } from "../models/user.js";

export const createUser = (body) => User.create(body);

export const findUserByEmail = (email) => User.findOne({ email });

export const findUserByVerificationToken = (verificationToken) =>
  User.findOne({ verificationToken });

export const findUserById = (id) => User.findById(id);

export const updateToken = (id, token) => User.findByIdAndUpdate(id, { token });

export const updateSubscription = (id, subscription) =>
  User.findByIdAndUpdate(id, { subscription });

export const updatingAvatar = (id, avatarURL) =>
  User.findByIdAndUpdate(id, { avatarURL });

export const updateVerify = (id) =>
  User.findByIdAndUpdate(id, { verify: true, verificationToken: null });
