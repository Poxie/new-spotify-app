import Image from 'next/image';
import styles from '../../styles/TopLists.module.scss'
import { Track } from "../../types"

export const TopListTrack: React.FC<Partial<Track> & {
    index: number;
    noAnimation?: boolean;
    loading?: boolean;
}> = ({ uri, name, index, artists, album, loading, noAnimation }) => {
    const className = [
        styles['track'],
        noAnimation ? styles['no-animation'] : ''
    ].join(' ');

    if(loading || !artists || !album) {
        return(
            <li className={className}>
                <span className={styles['track-index']}>
                    {index}
                </span>
                
                <div className={styles['track-main']}>
                    <div className={styles['track-name']}>
                        <div className={styles['track-image']} />
                        <span className={styles['loading-track-name']} />
                    </div>

                    <span className={styles['loading-track-artist']} />
                </div>

            </li>
        )
    }
    
    const firstDigit = parseInt(index.toString().slice(0,1));
    const prevIndex = parseInt(index.toString().slice(1,2)) === 0 ? (firstDigit - 1) * 10 : firstDigit * 10;
    const delay = ((index - prevIndex) * .05);

    const artist = artists[0];
    return(
        <li className={className} style={{ animationDelay: `${delay}s` }}>
            <span className={styles['track-index']}>
                {index}
            </span>

            <div className={styles['track-main']}>
                <div className={styles['track-name']}>
                    <a 
                        className={styles['track-image']}
                        href={uri}
                    >
                        <Image 
                            src={album.images[0].url}
                            layout={'fill'}
                            objectFit={'cover'}
                            alt={`${album.name} album image`}
                        />
                    </a>
                    <a href={uri}>
                        {name}
                    </a>
                </div>

                <span className={styles['track-artist']}>
                    by 
                    {' '}
                    <a href={artist.uri}>
                        <strong>
                            {artist.name}
                        </strong>
                    </a>
                </span>
            </div>
        </li>
    )
}