import express from "express";
import {
  validateLoginrUser,
  validateRegisterUser,
} from "../middlewares/userMiddleware.js";
import { login, register } from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/register", validateRegisterUser, register);
authRouter.post("/login", validateLoginrUser, login);

// authRouter.post("/logout", logout);

export default authRouter;
