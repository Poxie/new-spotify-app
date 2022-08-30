import Head from "next/head";
import { Explore } from "../components/explore";

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