import dynamic from "next/dynamic";
import Image from "next/image";
import { Track } from "../../types"
import styles from './TrackPlayer.module.scss';

// Making sure controls are only visible to client users
const TrackPlayerControls = dynamic(
    () => import('./TrackPlayerControls').then(res => res.TrackPlayerControls),
    { ssr: false }
);

export const TrackPlayer: React.FC<Partial<Track> & {
    className?: string;
    loading?: boolean;
}> = ({ loading, uri, preview_url, name, artists, album, className }) => {
    className = [
        styles['container'],
        className ? className : ''
    ].join(' ');
    
    if(loading || !album || !artists) {
        return(
            <div className={className}>
                <div className={styles['image']}/>
                <div className={styles['text']}>
                    <div className={styles['name-loading']} />
                    <div className={styles['artist-loading']} />
                </div>
                <TrackPlayerControls previewURL="" />
            </div>
        )
    }

    const image = album.images[0];
    const artist = artists[0];
    return(
        <div className={className}>
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
                previewURL={preview_url || ''}
            />
        </div>
    )
}