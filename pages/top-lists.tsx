import Head from "next/head";
import { TopLists } from "../components/top-lists";
import { setAuthToken } from "../redux/auth/actions";
import { wrapper } from "../redux/store";
import { setTopList } from "../redux/top-lists/actions";
import { Track } from "../types";

export default function topLists() {
    return(
        <>
        <Head>
            <title>
                Top Lists - {process.env.NEXT_PUBLIC_WEBSITE_NAME} 
            </title>
            <meta name="description" content="View any country's most played songs on Spotify." />
        </Head>
        
        <TopLists />
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

    const trackData = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/playlists/${process.env.NEXT_PUBLIC_GLOBAL_PLAYLIST_ID}`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    const { tracks: { items } } = await trackData.json();
    const trackItems = items.map((item: any) => item.track);

    dispatch(setAuthToken(access_token));
    dispatch(setTopList('global', trackItems));

    return {props: {}};
});