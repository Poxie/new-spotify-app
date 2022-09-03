import { useDispatch } from 'react-redux';
import { useAuth } from '../../contexts/auth/AuthProvider';
import { setProfileRecommendationsTerm } from '../../redux/profile/action';
import { selectProfileRecommendationsArtistTerm, selectProfileRecommendationsTrackTerm } from '../../redux/profile/hooks';
import { useAppSelector } from '../../redux/store';
import styles from '../../styles/Profile.module.scss';
import { Dropdown } from '../dropdown';

const getReadableDropdownItem = (id: string) => {
    if(id === 'long_term') return 'All time'
    else if(id === 'medium_term') return 'Last 6 months'
    else return 'Last 4 weeks';
}

const TABS = ['All time', 'Last 6 months', 'Last 4 weeks'];
export const ProfileRecommendationsHeader = () => {
    const { get } = useAuth();
    const dispatch = useDispatch();
    const artistTerm = useAppSelector(selectProfileRecommendationsArtistTerm); 
    const trackTerm = useAppSelector(selectProfileRecommendationsTrackTerm);

    const changeTerm = (type: 'artistTerm' | 'trackTerm', term: string) => {
        let prefix = 'long';
        if(term === 'Last 6 months') prefix = 'medium';
        if(term === 'Last 4 weeks') prefix = 'short';
        term = `${prefix}_term`;

        dispatch(setProfileRecommendationsTerm({
            term,
            type
        }))
    }

    return(
        <div className={styles['recommendations-header']}>
            <h2>
                Songs based on your top artists
                <Dropdown 
                    items={TABS}
                    onChange={term => changeTerm('artistTerm', term)}
                    defaultSelected={getReadableDropdownItem(artistTerm)}
                />
                and songs
                <Dropdown 
                    items={TABS}
                    onChange={term => changeTerm('trackTerm', term)}
                    defaultSelected={getReadableDropdownItem(trackTerm)}
                />
            </h2>
        </div>
    )
}