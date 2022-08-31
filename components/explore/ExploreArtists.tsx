import { selectAuthToken } from '../../redux/auth/selectors'
import { setExploreArtistsAlbums, setExploreArtistsArtist, setExploreArtistsPopularSongs, setExploreArtistsRelatedArtists } from '../../redux/explore/actions'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import styles from '../../styles/Explore.module.scss'
import { Artist } from '../../types'
import { SearchInput } from '../search-input/SearchInput'
import { ExploreArtistInfo } from './ExploreArtistInfo'
import { ExploreArtistRelated } from './ExploreArtistRelated'

export const ExploreArtists = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectAuthToken);

    const changeArtist = (artist: Artist) => {
        dispatch(setExploreArtistsArtist(artist));

        const requests = [
            {query: `/artists/${artist.id}/top-tracks?market=US`, responseKey: 'tracks', dispatchAction: setExploreArtistsPopularSongs},
            {query: `/artists/${artist.id}/related-artists`, responseKey: 'artists', dispatchAction: setExploreArtistsRelatedArtists},
            {query: `/artists/${artist.id}/albums?limit=50`, responseKey: 'items', dispatchAction: setExploreArtistsAlbums}
        ]
        requests.map(request => {
            fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${request.query}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(response => {
                    const data = response[request.responseKey];
                    dispatch(request.dispatchAction(data));
                })
        });
    }

    return(
        <>
            <h2 className={styles['sub-header']}>
                Enter your favorite artist and we will provide general information about the artist, as well as other artists you may like.
            </h2>
            <SearchInput 
                onChange={item => changeArtist(item as Artist)}
                type={'artist'}
            />

            <ExploreArtistInfo />
            <ExploreArtistRelated />
        </>
    )
}