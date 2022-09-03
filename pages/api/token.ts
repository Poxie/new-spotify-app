import { NextApiRequest, NextApiResponse } from "next";

const CREDENTIALS = Buffer.from(`${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST') return res.status(400).json({ error: 400, message: 'Bad request: Request method not allowed.' });

    // Getting code
    const { code } = JSON.parse(req.body) as { code?: string };
    if(!code) return res.status(400).json({ error: 400, message: 'Bad request: Code not present.' });

    // Creating request body
    const body = new URLSearchParams();
    body.append('grant_type', 'authorization_code');
    body.append('redirect_uri', process.env.NEXT_PUBLIC_REDIRECT_URI);
    body.append('code', code);

    fetch(process.env.NEXT_PUBLIC_TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${CREDENTIALS}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
    })
    .then(res => res.json())
    .then(response => {
        // Checking if error on request
        if(response.error) return res.status(401).json({ error: response.error, message: response.error_description });

        // Else return user access tokens
        const { access_token, refresh_token } = response;
        
        return res.status(200).json({ access_token, refresh_token });
    })
}