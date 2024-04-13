import { catchAsync } from "../helpers/catchAsync.js";
import { handleContactNotFound } from "../middlewares/contactMiddleware.js";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  refreshContact,
  updateStatusContact,
} from "../services/contactsServices.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;

  const contacts = await listContacts(owner);

  res.status(200).json(contacts);
});

export const createContact = catchAsync(async (req, res, next) => {
  const { _id: owner } = req.user;

  const newContact = await addContact({ ...req.body, owner });

  res.status(201).json(newContact);
});

export const getOneContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) {
    return handleContactNotFound(req, res);
  }

  res.status(200).json(contact);
});

export const deleteContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  const contact = await removeContact(contactId);

  if (!contact) {
    return handleContactNotFound(req, res);
  }

  res.status(200).json(contact);
});

export const updateContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;

  const contact = await refreshContact(contactId, body);

  if (!contact) {
    return handleContactNotFound(req, res);
  }

  res.status(200).json(contact);
});

export const updateStatus = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;

  const contact = await updateStatusContact(contactId, body);

  if (!contact) {
    return handleContactNotFound(req, res);
  }

  res.status(200).json(contact);
});
