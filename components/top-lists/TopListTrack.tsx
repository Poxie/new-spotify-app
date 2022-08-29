import Image from 'next/image';
import styles from '../../styles/TopLists.module.scss'
import { Track } from "../../types"

export const TopListTrack: React.FC<Partial<Track> & {
    index: number;
    loading?: boolean;
}> = ({ uri, name, index, artists, album, loading }) => {
    if(loading || !artists || !album) {
        return(
            <li className={styles['track']}>
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
    
    const artist = artists[0];
    
    return(
        <li className={styles['track']}>
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