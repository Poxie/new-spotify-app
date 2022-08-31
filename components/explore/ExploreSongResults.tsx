import { useEffect, useState } from 'react';
import { selectAuthToken } from '../../redux/auth/selectors';
import { setExploreSongResults } from '../../redux/explore/actions';
import { selectExploreSongArtist, selectExploreSongResults, selectExploreSongTrack } from '../../redux/explore/hooks';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import styles from '../../styles/Explore.module.scss';
import { Artist, Track } from '../../types';
import { TrackPlayer } from '../track-player/TrackPlayer';

export const ExploreSongResults = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectAuthToken);
    const track = useAppSelector(selectExploreSongTrack);
    const artist = useAppSelector(selectExploreSongArtist);
    const results = useAppSelector(selectExploreSongResults);
    const [loading, setLoading] = useState(false);

    // Fetching recommendations based on track and artist
    useEffect(() => {
        if(!artist || !track || results.length) return;
        setLoading(true);

        // Creating recommendation request for each artist genre
        const requests = artist.genres.map(genre => {
            return fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/recommendations?seed_artists=${artist.id}&seed_tracks=${track.id}&seed_genres=${genre}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => data.tracks);
        });

        // Waiting for all requests
        Promise.all(requests)
            .then(response => {
                // Combining all request response
                let allTracks: Track[] = [].concat.apply([], response);

                // Removing duplicates
                const ids: string[] = [];
                allTracks = allTracks.filter(track => {
                    const exists = ids.includes(track.id);
                    ids.push(track.id);
                    return !exists;
                })

                // Setting results
                dispatch(setExploreSongResults(allTracks));
                setLoading(false);
            })
    }, [token, track, artist, results]);

    return(
        <div className={styles['song-results']}>
            <h2 className={styles['song-results-header']}>
                Songs related to <strong>{artist?.name}</strong> and <strong>{track?.name}</strong>.
            </h2>

            <div className={styles['song-result-container']}>
                {loading && Array.from(Array(10)).map((_, key) => (
                    <TrackPlayer 
                        loading={true}
                        key={key}
                    />
                ))}

                {!loading && results.slice(0, 20).map(result => (
                    <TrackPlayer 
                        {...result}
                        key={result.id}
                    />
                ))}
            </div>
        </div>
    )
}