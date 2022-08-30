import Head from "next/head";
import { Explore } from "../components/explore";

export default function explore() {
    return(
        <>
        <Head>
            <title>
                Explore - {}
            </title>
        </Head>

        <Explore />
        </>
    )
}