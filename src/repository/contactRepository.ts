import { Contact } from '../models/contactModel.js';

async function create(contactData: any) {
    return await Contact.create(contactData);
}

export { create };