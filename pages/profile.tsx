import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Profile } from "../components/profile/Profile";
import { useAuth } from "../contexts/auth/AuthProvider";
import { setProfile, setProfileArtists, setProfileTracks } from "../redux/profile/action";
import { selectProfileToken } from "../redux/profile/hooks"
import { useAppSelector } from "../redux/store"

export default function profile() {
    const { get } = useAuth();
    const router = useRouter();
    const dispatch = useDispatch();
    const tokenData = useAppSelector(state => selectProfileToken(state, 'access_token'));
    
    useEffect(() => {
        if(tokenData?.token === undefined) return;

        // If token is not saved, login
        if(tokenData?.token === null) {
            router.replace('/login');
            return;
        }

        // Else get profile data
        get('me')
            .then(profile => {
                dispatch(setProfile(profile));
            });
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