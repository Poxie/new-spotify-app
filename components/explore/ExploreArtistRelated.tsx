import styles from '../../styles/Explore.module.scss';
import { selectExploreArtistsRelatedArtists } from "../../redux/explore/hooks"
import { useAppSelector } from "../../redux/store"
import { ExploreArtistInfoCard } from './ExploreArtistInfoCard';

export const ExploreArtistRelated = () => {
    const artists = useAppSelector(selectExploreArtistsRelatedArtists);
    if(!artists.length) return null;
    
    return(
        <div className={styles['related-artists']}>
            <h2>
                Related artists
            </h2>
            <div className={styles['related-artists-container']}>
                {artists.slice(0,8).map(artist => (
                    <ExploreArtistInfoCard 
                        uri={artist.uri}
                        title={artist.name}
                        subtitle={`${artist.followers.total.toLocaleString()} followers`}
                        extra={artist.genres.slice(0,2).join(', ')}
                        image={artist.images[2]?.url}
                        small={true}
                        key={artist.id}
                    />
                ))}
            </div>
        </div>
    )
}