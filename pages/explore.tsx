import Head from "next/head";
import { Explore } from "../components/explore";
import { setAuthToken } from "../redux/auth/actions";
import { wrapper } from "../redux/store";

export default function explore() {
    return(
        <>
        <Head>
            <title>
                Explore - {process.env.NEXT_PUBLIC_WEBSITE_NAME}
            </title>
        </Head>

        <Explore />
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch, getState }) => async () => {
    const encodedCredentials = Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64');
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