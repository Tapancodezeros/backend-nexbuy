import * as contactRepository from '../repository/contactRepository.js';

async function submitForm(fullName: string, email: string, message: string): Promise<void> {
    console.log(`Form submitted with: Full Name: ${fullName}, Email: ${email}, Message: ${message}`);

    await contactRepository.create({ fullName, email, message });

    return;
}

export { submitForm };