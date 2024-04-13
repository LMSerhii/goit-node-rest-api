import { User } from "../models/user.js";

export const createUser = (body) => User.create(body);

export const findUserByEmail = (email) => User.findOne({ email });

// export const findUserById = id => User.findById(id);

// export const findUserByUsername = username => User.findOne({ username });

// export const findUserByUsernameAndPassword = (username, password) => User.findOne({ username, password });

// export const findUserByUsernameAndEmail = (username, email) => User.findOne({ username, email });
