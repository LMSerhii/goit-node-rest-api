import { Contact } from "../models/contact.js";

export const listContacts = (owner, projections, options) =>
  Contact.find(owner, projections, options);

export const getContactById = (contactId) => Contact.findById(contactId);

export const addContact = (body) => Contact.create(body);

export const removeContact = (contactId) =>
  Contact.findByIdAndDelete(contactId);

export const refreshContact = (contactId, body) =>
  Contact.findByIdAndUpdate(contactId, body, { new: true });

export const updateStatusContact = (contactId, body) =>
  Contact.findByIdAndUpdate(contactId, body, { new: true });
