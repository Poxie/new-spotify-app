import Image from 'next/image';
import styles from '../../styles/Explore.module.scss';
import { Album, Track } from "../../types";

export const ExploreArtistTracks: React.FC<{
    header: string;
    tracks: (Track | Album)[];
    type: 'track' | 'album';
}> = ({ header, tracks, type }) => {
    if(!tracks.length) return null;

    return(
        <div className={styles['artist-tracks']}>
            <span className={styles['artist-tracks-header']}>
                {header}
            </span>

            <ul className={styles['artist-track-container']}>
                {tracks.map(track => (
                    <li 
                        className={styles['artist-track']}
                        key={track.id}
                    >
                        <a 
                            className={styles['artist-track-main']}
                            href={track.uri}
                        >
                            <div className={styles['artist-track-image']}>
                                <Image 
                                    src={type === 'album' ? (
                                        (track as Album).images[2]?.url
                                    ) : (
                                        (track as Track).album?.images[2]?.url
                                    )}
                                    layout={'fill'}
                                    objectFit={'cover'}
                                />
                            </div>
                            <span>
                                {track.name}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}