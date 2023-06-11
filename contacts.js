const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");
const { v4 } = require("uuid");

const updateContacts = async (contactList) =>
  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contactList = await listContacts();
    const id = String(contactId);
    const contact = contactList.find((contact) => contact.id === id);
    return contact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contactList = await listContacts();
    const id = String(contactId);
    const index = contactList.findIndex((contact) => contact.id === id);
    if (index === -1) {
      return null;
    }
    const [result] = contactList.splice(index, 1);
    await updateContacts(contactList);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactList = await listContacts();
    const newContact = { id: v4(), name, email, phone };
    contactList.push(newContact);
    await updateContacts(contactList);
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
