import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../contexts/auth/AuthProvider';
import { selectAuthToken } from '../../redux/auth/selectors';
import { setProfileArtists, setProfileRecommendations, setProfileRecommendationsTerm, setProfileTracks } from '../../redux/profile/action';
import { selectProfileRecommendationsArtistTerm, selectProfileRecommendationsLoading, selectProfileRecommendationsTrackTerm } from '../../redux/profile/hooks';
import { useAppSelector } from '../../redux/store';
import styles from '../../styles/Profile.module.scss';
import { Dropdown } from '../dropdown';

const TABS = ['All time', 'Last 6 months', 'Last 4 weeks'];
export const ProfileRecommendationsHeader = () => {
    const { get } = useAuth();
    const dispatch = useDispatch();
    const token = useAppSelector(selectAuthToken);
    const loading = useAppSelector(selectProfileRecommendationsLoading);

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
                />
                and songs
                <Dropdown 
                    items={TABS}
                    onChange={term => changeTerm('trackTerm', term)}
                />
            </h2>
        </div>
    )
}