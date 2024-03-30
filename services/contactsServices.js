import { readFile, writeFile } from "fs/promises";
import path from "path";
import { bodyValidate } from "../helpers/bodyValidate.js";

const contactsPath = path.join("db", "contacts.json");

export async function listContacts() {
  try {
    const res = await readFile(contactsPath);
    return JSON.parse(res);
  } catch (error) {
    return [];
  }
}

export async function getContactById(contactId) {
  try {
    const res = await readFile(contactsPath);
    const contactsList = JSON.parse(res);

    const foundContact = contactsList.find(
      (contact) => contact.id === contactId
    );

    return foundContact || null;
  } catch (error) {
    return null;
  }
}

export async function removeContact(contactId) {
  try {
    const res = await readFile(contactsPath);
    const contactsList = JSON.parse(res);

    const index = contactsList.findIndex((contact) => contact.id === contactId);

    if (index !== -1) {
      const removedContact = contactsList.splice(index, 1)[0];

      await writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

      return removedContact;
    } else return null;
  } catch (error) {
    return null;
  }
}

export async function addContact(name, email, phone) {
  try {
    const res = await readFile(contactsPath);
    const contactsList = JSON.parse(res);

    const newContact = { id: Date.now().toString(), name, email, phone };
    const newContactsList = [...contactsList, newContact];

    await writeFile(contactsPath, JSON.stringify(newContactsList, null, 2));

    return newContact;
  } catch (error) {
    return null;
  }
}

export async function refreshContact(id, name, email, phone) {
  try {
    const res = await readFile(contactsPath);
    const contactsList = JSON.parse(res);

    const index = contactsList.findIndex((user) => user.id === id);

    if (index === -1) {
      res.status(404).json({
        msg: "User not found",
      });
    }

    const newData = bodyValidate(name, email, phone);

    contactsList[index] = { ...contactsList[index], ...newData };

    await writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

    return contactsList[index];
  } catch (error) {
    return null;
  }
}
