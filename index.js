const {listContacts, getContactById, removeContact, addContact} = require('./contacts');
const {Command} = require('commander');


const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();


const invokeAction = async ({action, id, name, email, phone}) => {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case 'get':
      const contactById = await getContactById(id);
      if (!contactById) {
        throw new Error(`Contact with this not found`);
      }
      console.log(contactById);
      break;

    case 'add':
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
      const removedContact = await removeContact(id);
      console.log(`Contact with id ${id} was removed from the contact list`);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);

