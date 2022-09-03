import styles from '../../styles/Profile.module.scss';
import { ProfileTops } from './ProfileTops';

export const Profile = () => {
    return(
        <main className={styles['container']}>
            <ProfileTops />
        </main>
    )
}