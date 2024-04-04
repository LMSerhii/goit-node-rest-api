import { readFile, writeFile } from "fs/promises";
import path from "path";

const contactsPath = path.join("db", "contacts.json");

export const readContactsFile = async () => {
  try {
    const data = await readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export async function writeContactsFile(data) {
  try {
    await writeFile(contactsPath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error("Failed to write contacts file.");
  }
}
