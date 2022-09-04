import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { setProfileToken } from "../redux/profile/action";
import { useAppDispatch } from "../redux/store";

const SCOPES = 'user-read-private playlist-read-private user-top-read user-read-recently-played';
const CODE_URL = `
${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}
?response_type=code
&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}
&scope=${encodeURIComponent(SCOPES)}
&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_REDIRECT_URI)}
`;
export default function login() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        // Getitng access code
        const code = new URLSearchParams(window.location.search).get('code');
        
        // If code is present, log user in
        if(code) {
            fetch(`/api/token`, {
                method: 'POST',
                body: JSON.stringify({ code })
            })
                .then(res => res.json())
                .then(response => {
                    // Extracting necessary tokens
                    const { access_token, refresh_token } = response;
                    if(!access_token || !refresh_token) return;

                    // Storing token in local storage
                    window.localStorage.accessToken = access_token;
                    window.localStorage.refreshToken = refresh_token;

                    // Updating tokens 
                    dispatch(setProfileToken({ type: 'access_token', token: access_token, refresh_token }));
                    router.replace('/profile');
                })
                .catch(error => {
                    // On error, request new code
                    window.location.replace(CODE_URL);
                })
        }
        // Else redirect to login page 
        else {
            window.location.replace(CODE_URL);
        }
    }, []);

    return(
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h1>
                Logging you in...
            </h1>
        </div>
    );
}