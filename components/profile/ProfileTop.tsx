import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProfileActiveTerm } from '../../redux/profile/action';
import styles from '../../styles/Profile.module.scss';
import { Artist, Track } from "../../types"
import { Dropdown } from '../dropdown';
import { ProfileItem } from './ProfileItem';

const DROPDOWN_ITEMS = ['All time', 'Last 6 months', 'Last 4 weeks'];

const getReadableDropdownItem = (id: string) => {
    if(id === 'long_term') return 'All time'
    else if(id === 'medium_term') return 'Last 6 months'
    else return 'Last 4 weeks';
}

const DEFAULT_ITEM_AMOUNT = 6;
export const ProfileTop: React.FC<{
    header: string;
    items: (Artist | Track)[];
    type: 'artists' | 'tracks';
    activeTerm: string;
}> = ({ header, items, type, activeTerm }) => {
    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch();

    // Updating term 
    const changeTerm = (term: string) => {
        let prefix = 'long';
        if(term === 'Last 6 months') prefix = 'medium';
        else if(term === 'Last 4 weeks') prefix = 'short';

        term = `${prefix}_term`;

        dispatch(setProfileActiveTerm({
            type,
            term
        }))
    }

    const showAmount = expanded ? items?.length || DEFAULT_ITEM_AMOUNT : DEFAULT_ITEM_AMOUNT;
    return(
        <div className={styles['top']}>
            <div className={styles['top-header']}>
                <div className={styles['top-header-main']}>
                    <h2>
                        {header}
                    </h2>
                    <Dropdown 
                        items={DROPDOWN_ITEMS}
                        onChange={changeTerm}
                        defaultSelected={getReadableDropdownItem(activeTerm)}
                    />
                </div>

                <button onClick={() => setExpanded(!expanded)}>
                    {expanded ? 'Show less' : 'Show more'}
                </button>
            </div>
            <div className={styles['top-items']}>
                {!items && (
                    Array.from(Array(6)).map((_, key) => (
                        <ProfileItem 
                            loading={true}
                            key={key}
                        />
                    ))
                )}

                {items?.slice(0, showAmount)?.map(item => {
                    // Image has different location for artist and track
                    const image = item.type === 'artist' ?
                        (item as Artist).images[1]?.url :
                        (item as Track).album.images[1]?.url;

                    return(
                        <ProfileItem
                            image={image} 
                            name={item.name}
                            uri={item.uri}
                            key={item.id}
                        />
                    )
                })}
            </div>
        </div>
    )
}