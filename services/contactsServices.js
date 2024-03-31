import {
  readContactsFile,
  writeContactsFile,
} from "../helpers/fileOperations.js";

export async function listContacts() {
  return await readContactsFile();
}

export async function getContactById(contactId) {
  const contactsList = await readContactsFile();

  return contactsList.find((contact) => contact.id === contactId) || null;
}

export async function removeContact(contactId) {
  const contactsList = await readContactsFile();

  const index = contactsList.findIndex((contact) => contact.id === contactId);

  if (index === -1) return null;

  const removedContact = contactsList.splice(index, 1)[0];

  await writeContactsFile(contactsList);

  return removedContact;
}

export async function addContact(name, email, phone) {
  const contactsList = await readContactsFile();

  const newContact = { id: Date.now().toString(), name, email, phone };

  contactsList.push(newContact);

  await writeContactsFile(contactsList);

  return newContact;
}

export async function refreshContact(id, name, email, phone) {
  const contactsList = await readContactsFile();

  const index = contactsList.findIndex((user) => user.id === id);

  if (index === -1) return null;

  const updatedContact = { ...contactsList[index] };
  if (name !== undefined) updatedContact.name = name;
  if (email !== undefined) updatedContact.email = email;
  if (phone !== undefined) updatedContact.phone = phone;

  contactsList[index] = updatedContact;

  await writeContactsFile(contactsList);

  return updatedContact;
}
