import { Contact } from "../models/contact.js";

export const listContacts = () => Contact.find();

export const getContactById = (contactId) => Contact.findById(contactId);

export const removeContact = (contactId) =>
  Contact.findByIdAndDelete(contactId);

export const addContact = (name, email, phone) =>
  Contact.create({ name, email, phone });

export const refreshContact = (contactId, body) =>
  Contact.findByIdAndUpdate(contactId, body, { new: true });

export const updateStatusContact = (contactId, body) =>
  Contact.findByIdAndUpdate(contactId, body, { new: true });
