import styles from '../../styles/Explore.module.scss';
import { ParamTabs } from '../param-tabs';
import { ExploreHeader } from "./ExploreHeader"
import { ExploreMain } from './ExploreMain';

const EXPLORE_TABS = ['Songs', 'Artists'];
export const Explore = () => {
    return(
        <main className={styles['container']}>
            <ExploreHeader />
            <ParamTabs 
                tabs={EXPLORE_TABS}
                defaultActive={EXPLORE_TABS[0]}
            />
            <ExploreMain />
        </main>
    )
}