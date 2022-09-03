import styles from '../../styles/Profile.module.scss';
import { selectProfileActiveArtistTerm, selectProfileActiveTracksTerm, selectProfileArtists, selectProfileTracks } from "../../redux/profile/hooks"
import { useAppSelector } from "../../redux/store"
import { ProfileTop } from "./ProfileTop";
import { useAuth } from '../../contexts/auth/AuthProvider';
import { useDispatch } from 'react-redux';
import { setProfileArtists, setProfileTracks } from '../../redux/profile/action';

export const ProfileTops = () => {
    const { get } = useAuth();
    const dispatch = useDispatch();
    const tracks = useAppSelector(selectProfileTracks);
    const artists = useAppSelector(selectProfileArtists);
    const activeTrackTerm = useAppSelector(selectProfileActiveTracksTerm);
    const activeArtistTerm = useAppSelector(selectProfileActiveArtistTerm);

    // If tracks does not exist, fetch them
    if(!tracks) {
        get(`me/top/tracks?time_range=${activeTrackTerm}&limit=50`)
            .then(({ items }) => {
                dispatch(setProfileTracks({
                    type: activeTrackTerm as any,
                    items
                }))
            }).catch(console.error)
    }
    // If artists dont exist, fetch them
    if(!artists) {
        get(`me/top/artists?time_range=${activeArtistTerm}&limit=50`)
            .then(({ items }) => {
                dispatch(setProfileArtists({
                    type: activeArtistTerm as any,
                    items
                }))
            }).catch(console.error)
    }

    return(
        <div className={styles['tops']}>
            <ProfileTop 
                items={artists}
                type={'artists'}
                activeTerm={activeArtistTerm}
                header={'Your most played artists'}
            />
            <ProfileTop 
                items={tracks}
                type={'tracks'}
                activeTerm={activeTrackTerm}
                header={'Your most played tracks'}
            />
        </div>
    )
}