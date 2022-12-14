import styles from '../../styles/Profile.module.scss';
import { selectProfileArtistsByTerm, selectProfileRecommendations, selectProfileRecommendationsArtistTerm, selectProfileRecommendationsTrackTerm, selectProfileToken, selectProfileTracksByTerm } from "../../redux/profile/hooks"
import { useAppSelector } from "../../redux/store"
import { TrackPlayer } from "../track-player/TrackPlayer";
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { pushProfileRecommendations, setProfileArtists, setProfileRecommendations, setProfileTracks } from '../../redux/profile/action';
import { useAuth } from '../../contexts/auth/AuthProvider';
import { selectAuthToken } from '../../redux/auth/selectors';

const RECOMMENDED_TRACK_AMOUNT = 20;
const SCROLL_FROM_BOTTOM = 500;
export const ProfileRecommendationsItems = () => {
    const token = useAppSelector(selectAuthToken);
    const profileToken = useAppSelector(state => selectProfileToken(state, 'access_token'));
    const items = useAppSelector(selectProfileRecommendations);
    const trackTerm = useAppSelector(selectProfileRecommendationsTrackTerm);
    const artistTerm = useAppSelector(selectProfileRecommendationsArtistTerm);
    const tracks = useAppSelector(state => selectProfileTracksByTerm(state, trackTerm));
    const artists = useAppSelector(state => selectProfileArtistsByTerm(state, artistTerm));
    const fetching = useRef(false);
    const dispatch = useDispatch();
    const { get } = useAuth();
    const ref = useRef<HTMLDivElement>(null);

    // Function to get recommendations
    const getRecommendations = useCallback(async () => {
        const seedTracks = tracks[0].id;
        const seedArtists = artists[0].id;
        const seedGenres = artists.slice(0,3).map(artist => artist.genres[0]).join(',');

        return fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/recommendations?seed_tracks=${seedTracks}&seed_artists=${seedArtists}&seed_genres=${seedGenres}&limit=${RECOMMENDED_TRACK_AMOUNT}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => res.json())
            .then(({ tracks }) => tracks);
    }, [tracks, artists, token]);

    // Showing more results on scroll
    useEffect(() => {
        const checkScroll = () => {
            if(!ref.current) return;

            const height = ref.current.getBoundingClientRect().height;
            const fromTop = ref.current.offsetTop;

            const bottom = height + fromTop - SCROLL_FROM_BOTTOM;
            const scroll = window.scrollY + window.innerHeight
        
            // If meet threshold, show more items
            if(scroll >= bottom) {
                if(fetching.current) return;
                fetching.current = true;
                getRecommendations()
                    .then(tracks => {
                        dispatch(pushProfileRecommendations(tracks));
                        fetching.current = false;
                    })
            }
        }

        document.addEventListener('scroll', checkScroll);
        return () => document.removeEventListener('scroll', checkScroll);
    }, [tracks, artists]);

    // Displaying recommendations on change and on mount
    useEffect(() => {
        // Making sure request arent being made before token initalization
        if(!token || !profileToken) return;

        dispatch(setProfileRecommendations([]));

        // If tracks dont already exist in store, fetch and store
        if(!tracks) {
            get(`me/top/tracks?time_range=${trackTerm}&limit=50`)
                .then(({ items }) => {
                    dispatch(setProfileTracks({
                        type: trackTerm as any,
                        items
                    }))
                }).catch(error => error);
        }
        // If artists dont already exist in store, fetch and store
        if(!artists) {
            get(`me/top/artists?time_range=${artistTerm}&limit=50`)
                .then(({ items }) => {
                    dispatch(setProfileArtists({
                        type: artistTerm as any,
                        items
                    }))
                }).catch(error => error);
        }

        // Preventing multiple requests
        if(!artists?.length || !tracks?.length) return;
        if(fetching.current) return;
        fetching.current = true;

        // Getting initial recommendations
        getRecommendations()
            .then(tracks => {
                dispatch(setProfileRecommendations(tracks));
                fetching.current = false;
            })
    }, [artistTerm, trackTerm, tracks, artists, get, token, profileToken]);

    return(
        <div className={styles['recommendation-items']} ref={ref}>
            {!items?.length && (
                Array.from(Array(RECOMMENDED_TRACK_AMOUNT)).map((_, key) => (
                    <TrackPlayer 
                        loading={true}
                        key={key}
                    />
                ))
            )}

            {items?.map(item => (
                <TrackPlayer 
                    {...item}
                    key={item.id}
                />
            ))}
        </div>
    )
}