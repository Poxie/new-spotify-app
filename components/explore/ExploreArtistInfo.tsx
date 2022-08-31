import styles from '../../styles/Explore.module.scss';
import { selectExploreArtistsArtist, selectExploreArtistsPopuplarSongs } from "../../redux/explore/hooks"
import { useAppSelector } from "../../redux/store"
import { ExploreArtistInfoCard } from "./ExploreArtistInfoCard"

export const ExploreArtistInfo = () => {
    const artist = useAppSelector(selectExploreArtistsArtist);
    const tracks = useAppSelector(selectExploreArtistsPopuplarSongs);
    if(!artist || !tracks.length) return null;

    const track = tracks[0];
    return(
        <div className={styles['artist-info']}>
            <ExploreArtistInfoCard 
                uri={artist.uri}
                title={artist.name}
                subtitle={`${artist.followers.total.toLocaleString()} followers`}
                extra={artist.genres.slice(0, 3).join(', ')}
                image={artist.images[2]?.url}
            />
            <ExploreArtistInfoCard
                uri={track.uri}
                header={'Most popular song'} 
                title={track.name}
                subtitle={`${track.popularity} popularity`}
                image={track.album.images[1]?.url}
            />
        </div>
    )
}