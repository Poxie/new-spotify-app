import dynamic from "next/dynamic";
import Image from "next/image";
import { Track } from "../../types"
import styles from './TrackPlayer.module.scss';

// Making sure controls are only visible to client users
const TrackPlayerControls = dynamic(
    () => import('./TrackPlayerControls').then(res => res.TrackPlayerControls),
    { ssr: false }
);

export const TrackPlayer: React.FC<Track> = ({ uri, preview_url, name, artists, album }) => {
    const image = album.images[0];
    const artist = artists[0];
    return(
        <div className={styles['container']}>
            <a 
                className={styles['image']}
                href={uri}
            >
                <Image 
                    src={image.url}
                    layout={'fill'}
                    objectFit={'cover'}
                    alt={`${name} image preview`}
                />
            </a>
            <div className={styles['text']}>
                <a 
                    title={name}
                    className={styles['name']} 
                    href={uri}
                >
                    {name}
                </a>
                <a 
                    title={artist.name}
                    className={styles['artist']}
                    href={artist.uri}
                >
                    {artist.name}
                </a>
            </div>
            <TrackPlayerControls 
                previewURL={preview_url}
            />
        </div>
    )
}