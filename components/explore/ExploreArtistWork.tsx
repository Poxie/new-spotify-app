import styles from '../../styles/Explore.module.scss';
import { selectExploreArtistAlbums, selectExploreArtistsPopuplarSongs } from "../../redux/explore/hooks"
import { useAppSelector } from "../../redux/store"
import { ExploreArtistTracks } from "./ExploreArtistTracks";

export const ExploreArtistWork = () => {
    const tracks = useAppSelector(selectExploreArtistsPopuplarSongs);
    const albums = useAppSelector(selectExploreArtistAlbums);
    
    return(
        <div className={styles['artist-work']}>
            <ExploreArtistTracks 
                header={'Most popular songs'}
                tracks={tracks}
                type={'track'}
            />
            <ExploreArtistTracks 
                header={'Albums'}
                tracks={albums}
                type={'album'}
            />
        </div>
    )
}