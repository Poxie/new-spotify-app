import styles from '../../styles/Explore.module.scss';
import { useState } from "react"
import { Artist, Track } from "../../types";
import { SearchInput } from "../search-input/SearchInput"
import { ExploreSongSelectorPreview } from './ExploreSongSelectorPreview';

export const ExploreSongSelector: React.FC<{
    type: 'track' | 'artist';
    onChange: (item: Artist | Track) => void;
}> = ({ type, onChange }) => {
    const [item, setItem] = useState<Artist | Track | null>(null);

    const updateItem = (item: Artist | Track) => {
        onChange(item);
        setItem(item);
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