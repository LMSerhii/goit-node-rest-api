import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatus,
} from "../controllers/contactsControllers.js";
import {
  isValidId,
  validateCreateContact,
  validateUpdateContact,
  validateUpdateFavorite,
} from "../middlewares/contactMiddleware.js";
import { auth, verifyOwner } from "../middlewares/authMiddleware.js";

const contactsRouter = express.Router();

contactsRouter.get("/", auth, getAllContacts);

contactsRouter.get("/:contactId", auth, isValidId, verifyOwner, getOneContact);

contactsRouter.delete(
  "/:contactId",
  auth,
  isValidId,
  verifyOwner,
  deleteContact
);

contactsRouter.post("/", auth, validateCreateContact, createContact);

contactsRouter.put(
  "/:contactId",
  auth,
  isValidId,
  verifyOwner,
  validateUpdateContact,
  updateContact
);

contactsRouter.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  verifyOwner,
  validateUpdateFavorite,
  updateStatus
);

export default contactsRouter;
