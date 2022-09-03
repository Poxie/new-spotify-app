import styles from '../../styles/Profile.module.scss';
import { ParamTabs } from '../param-tabs';
import { ProfileTops } from './ProfileTops';

const PROFILE_TABS = ['Most played', 'Recommendations'];
export const Profile = () => {
    return(
        <main className={styles['container']}>
            <ParamTabs 
                tabs={PROFILE_TABS}
                defaultActive={PROFILE_TABS[0]}
            />
            <ProfileTops />
        </main>
    )
}