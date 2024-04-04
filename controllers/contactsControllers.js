import { handleContactNotFound } from "../middlewares/contactMiddleware.js";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  refreshContact,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const contacts = await listContacts();

  res.status(200).json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;

  const contact = await getContactById(id);

  if (!contact) {
    return handleContactNotFound(req, res);
  }

  res.status(200).json(contact);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;

  const contact = await removeContact(id);

  if (!contact) {
    return handleContactNotFound(req, res);
  }

  res.status(200).json(contact);
};

export const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;

  const newContact = await addContact(name, email, phone);

  res.status(201).json(newContact);
};

export const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const contact = await refreshContact(id, name, email, phone);

  if (!contact) {
    return handleContactNotFound(req, res);
  }

  res.status(200).json(contact);
};
