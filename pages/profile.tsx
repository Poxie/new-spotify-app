import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Profile } from "../components/profile/Profile";
import { useAuth } from "../contexts/auth/AuthProvider";
import { setAuthToken } from "../redux/auth/actions";
import { setProfile, setProfileArtists, setProfileTracks } from "../redux/profile/action";
import { selectProfileToken } from "../redux/profile/hooks"
import { useAppSelector, wrapper } from "../redux/store"

export default function profile() {
    const { get } = useAuth();
    const router = useRouter();
    const tokenData = useAppSelector(state => selectProfileToken(state, 'access_token'));
    
    useEffect(() => {
        if(tokenData?.token === undefined) return;

        // If token is not saved, login
        if(tokenData?.token === null) {
            router.replace('/login');
            return;
        }
    }, [tokenData?.token]);

    return(
        <>
        <Head>
            <title>
                Profile - {process.env.NEXT_PUBLIC_WEBSITE_NAME}
            </title>
        </Head>
        
        <Profile />
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch, getState }) => async () => {
    const encodedCredentials = Buffer.from(process.env.NEXT_PUBLIC_CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64');
    const data = await fetch(`${process.env.NEXT_PUBLIC_TOKEN_ENDPOINT}?grant_type=client_credentials`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${encodedCredentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    const { access_token } = await data.json();

    dispatch(setAuthToken(access_token));

    return {props: {}};
});