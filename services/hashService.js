import bcrypt from "bcrypt";

export const createHashPassword = (password) => bcrypt.hash(password, 10);

export const comparePassword = (password, hash) =>
  bcrypt.compare(password, hash);
