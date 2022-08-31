import styles from '../../styles/Explore.module.scss';
import { ExploreHeader } from "./ExploreHeader"
import { ExploreMain } from './ExploreMain';
import { ExploreTabs } from './ExploreTabs';

export const Explore = () => {
    return(
        <main className={styles['container']}>
            <ExploreHeader />
            <ExploreTabs />
            <ExploreMain />
        </main>
    )
}