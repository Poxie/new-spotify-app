import { useEffect, useState } from 'react';
import { selectAuthToken } from '../../redux/auth/selectors';
import { useAppSelector } from '../../redux/store';
import styles from '../../styles/Explore.module.scss';
import { Artist, Track } from '../../types';
import { TrackPlayer } from '../track-player/TrackPlayer';

export const ExploreSongResults: React.FC<{
    track: Track;
    artist: Artist;
}> = ({ track, artist }) => {
    const token = useAppSelector(selectAuthToken);
    const [results, setResults] = useState<Track[]>([]);

    // Fetching recommendations based on track and artist
    useEffect(() => {
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
                setResults(allTracks);
            })
    }, [token, track, artist]);

    return(
        <div className={styles['song-results']}>
            <h2 className={styles['song-results-header']}>
                Songs related to <strong>{artist.name}</strong> and <strong>{track.name}</strong>.
            </h2>

            <div className={styles['song-result-container']}>
                {results.map(result => (
                    <TrackPlayer 
                        {...result}
                        key={result.id}
                    />
                ))}
            </div>
        </div>
    )
}