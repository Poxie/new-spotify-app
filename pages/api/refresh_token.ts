import { NextApiRequest, NextApiResponse } from "next";

const CREDENTIALS = Buffer.from(`${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { refresh_token } = JSON.parse(req.body) as { refresh_token: string };

    // Creating request body
    const body = new URLSearchParams();
    body.append('grant_type', 'refresh_token');
    body.append('refresh_token', refresh_token);

    // Fetch new access token
    fetch(`${process.env.NEXT_PUBLIC_TOKEN_ENDPOINT}`, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + CREDENTIALS,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
    })
    .then(res => res.json())
    .then(response => {
        return res.status(200).json({ access_token: response.access_token });
    })
} 