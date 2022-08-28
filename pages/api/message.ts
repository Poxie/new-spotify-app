import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD
    }
});
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
        const body = JSON.parse(req.body as any);
        const status = await transporter.sendMail({
            subject: process.env.MAIL_SUBJECT,
            from: body.email,
            text: body.message,
            to: process.env.MAIL_TO_ADDRESS,
        })
        
        if(status.accepted) {
            return res.status(200).json({ status: 200, message: 'Mail sent successfully.' });
        } else if(status.rejected) {
            return res.status(500).json({ status: 200, message: 'Something went wrong.' })
        }
    }

    return res.status(400).json({ status: 400, message: 'Unsupported method.' })
}