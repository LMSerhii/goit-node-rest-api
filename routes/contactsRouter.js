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

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:contactId", isValidId, getOneContact);

contactsRouter.delete("/:contactId", isValidId, deleteContact);

contactsRouter.post("/", validateCreateContact, createContact);

contactsRouter.put(
  "/:contactId",
  isValidId,
  validateUpdateContact,
  updateContact
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  validateUpdateFavorite,
  updateStatus
);

export default contactsRouter;
