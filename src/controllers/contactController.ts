import { Request, Response } from 'express';
import { submitForm } from '../service/contactService.js';
import { STATUS, MESSAGES, HTTP_STATUS } from '../constants/messages.js';


async function submitContactForm(req: Request, res: Response) {
    try {
        const { fullName, email, message } = req.body;

        if (!fullName || !email || !message) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: STATUS.ERROR, message: MESSAGES.MISSING_FIELDS('fullName, email, message') });
        }

        await submitForm(fullName, email, message);

        res.status(HTTP_STATUS.OK).json({ status: STATUS.SUCCESS, message: 'Contact form submitted successfully.' });
    } catch (error) {
        console.error("Error submitting contact form:", error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: STATUS.ERROR, message: (error as Error).message });
    }
}

export { submitContactForm };