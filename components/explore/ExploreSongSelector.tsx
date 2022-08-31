import styles from '../../styles/Explore.module.scss';
import { useState } from "react"
import { Artist, Track } from "../../types";
import { SearchInput } from "../search-input/SearchInput"
import { ExploreSongSelectorPreview } from './ExploreSongSelectorPreview';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { selectExploreSongArtist, selectExploreSongTrack } from '../../redux/explore/hooks';
import { setExploreSongArtist, setExploreSongTrack } from '../../redux/explore/actions';

export const ExploreSongSelector: React.FC<{
    type: 'track' | 'artist';
}> = ({ type }) => {
    const dispatch = useAppDispatch();
    const track = useAppSelector(selectExploreSongTrack);
    const artist = useAppSelector(selectExploreSongArtist);
    const item = type === 'track' ? track : artist;

    const updateItem = (item: Artist | Track) => {
        const dispatchType = type === 'track' ? setExploreSongTrack : setExploreSongArtist;
        dispatch(dispatchType(item as any));
    }

    return(
        <div className={styles['selector']}>
            <ExploreSongSelectorPreview 
                title={item?.name}
                image={type === 'track' ? 
                    (
                        (item as Track)?.album?.images[1]?.url
                    ) : (
                        (item as Artist)?.images[1]?.url
                    )
                }
                subtitle={type === 'track' ? 
                    (
                        (item as Track)?.artists?.map(artist => artist.name).join(', ')
                    ) : (
                        `${(item as Artist)?.followers?.total?.toLocaleString()} followers`
                    )
                }
                extra={type === 'artist' ? (item as Artist)?.genres?.slice(0,2).join(', ') : undefined}
                loading={!item}
            />

            <SearchInput 
                type={type}
                onChange={updateItem}
            />
        </div>
    )
}