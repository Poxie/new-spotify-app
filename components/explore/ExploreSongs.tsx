import { useState } from 'react';
import styles from '../../styles/Explore.module.scss';
import { Artist, Track } from '../../types';
import { ExploreSongResults } from './ExploreSongResults';
import { ExploreSongSelector } from './ExploreSongSelector';

export const ExploreSongs = () => {
    const [artist, setArtist] = useState<Artist | null>(null);
    const [track, setTrack] = useState<Track | null>(null);

    return(
        <>
        <h2 className={styles['sub-header']}>
            Get songs related to a particular song and artist. We will suggest songs you may like based of your input.
        </h2>

        <div className={styles['selectors']}>
            <ExploreSongSelector 
                type={'track'}
                onChange={item => setTrack(item as Track)}
            />
            <ExploreSongSelector 
                type={'artist'}
                onChange={item => setArtist(item as Artist)}
            />
        </div>

        {artist && track && (
            <ExploreSongResults 
                track={track}
                artist={artist}
            />
        )}
        </>
    )
}