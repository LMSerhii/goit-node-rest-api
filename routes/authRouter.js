import express from "express";
import {
  validateAvatarUser,
  validateLoginrUser,
  validateRegisterUser,
  validateSubscriptionUser,
  validateVerifyUser,
} from "../middlewares/userMiddleware.js";
import {
  current,
  login,
  logout,
  register,
  resendVerifyEmail,
  subscriptionUpdate,
  updateAvatar,
  verifyEmail,
} from "../controllers/authControllers.js";
import { auth } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", validateRegisterUser, register);
authRouter.get("/verify/:verificationToken", verifyEmail);
authRouter.post("/verify", validateVerifyUser, resendVerifyEmail);

authRouter.post("/login", validateLoginrUser, login);
authRouter.post("/logout", auth, logout);
authRouter.get("/current", auth, current);

authRouter.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  validateAvatarUser,
  updateAvatar
);
authRouter.patch("/", auth, validateSubscriptionUser, subscriptionUpdate);

export default authRouter;
