const fs = require('fs');
const path = require('path');

contactsPath = path.join(__dirname, './db/contacts.json');

function listContacts() {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    console.log(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    console.log(contact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter((c) => c.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Contact with ID ${contactId} has been removed.`);
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    const newContact = { id: Date.now(), name, email, phone };
    const updatedContacts = [...contacts, newContact];
    fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Contact has been added: ${name}`);
    });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact }

