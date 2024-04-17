import express from "express";
import {
  validateLoginrUser,
  validateRegisterUser,
  validateSubscriptionUser,
} from "../middlewares/userMiddleware.js";
import {
  current,
  login,
  logout,
  register,
  subscriptionUpdate,
  updateAvatar,
} from "../controllers/authControllers.js";
import { auth } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", validateRegisterUser, register);
authRouter.post("/login", validateLoginrUser, login);
authRouter.post("/logout", auth, logout);
authRouter.get("/current", auth, current);

authRouter.patch("/avatars", auth, upload.single("avatar"), updateAvatar);
authRouter.patch("/", auth, validateSubscriptionUser, subscriptionUpdate);

export default authRouter;
