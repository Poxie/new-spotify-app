import { useRouter } from "next/router";
import { useEffect } from "react";
import { useToast } from "../../contexts/toast/ToastProvider";
import { selectAuthToken, selectAuthTokenLoading } from "../../redux/auth/selectors";
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { setTopList } from "../../redux/top-lists/actions";
import { selectTopList, selectTopLists } from "../../redux/top-lists/hooks"
import { TopListHeader } from "./TopListHeader";
import { TopListTracks } from "./TopListTracks";

export const TopLists = () => {
    const { setToast } = useToast();
    const { country='Global' } = useRouter().query as { country?: string };
    const tracks = useAppSelector(selectTopLists);
    const token = useAppSelector(selectAuthToken);
    const tokenLoading = useAppSelector(selectAuthTokenLoading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(tokenLoading || !tracks[country]) {
            const query = encodeURIComponent(`spotify, top 50 ${country}`);
            fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/search?q=${query}&type=playlist`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => res.json()).then(async data => {
                const { playlists: { items: playlistItems } } = data;
                const { tracks: { href } } = playlistItems[0];
                const trackData = await fetch(href, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const { items } = await trackData.json();
                dispatch(setTopList(country, items.map((item: any) => item.track)));
            }).catch(error => {
                setToast({
                    content: 'Something went wrong loading tracks. Please try again.',
                    type: 'error',
                    interval: 7000
                })
            })
        }
    }, [country, tracks, token, tokenLoading]);

    return(
        <main>
            <TopListHeader 
                country={country}
            />
            <TopListTracks 
                country={country}
            />
        </main>
    )
}