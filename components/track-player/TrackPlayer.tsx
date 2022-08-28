import Image from "next/image";
import { Track } from "../../types"
import styles from './TrackPlayer.module.scss';

export const TrackPlayer: React.FC<Track> = ({ uri, name, artists, album }) => {
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
        </div>
    )
}