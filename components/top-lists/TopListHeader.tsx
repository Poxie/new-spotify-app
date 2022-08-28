import styles from '../../styles/TopLists.module.scss'
import { TopListHeaderTracks } from './TopListHeaderTracks';

export const TopListHeader: React.FC<{
    country: string;
}> = ({ country }) => {
    const header = country === 'global' ? 'globally' : `in ${country}`
    return(
        <section className={styles['header-section']}>
            <h1 className={styles['header']}>
                Top songs
                {' '}
                <span className={styles['highlight']}>
                    {header}
                </span>
            </h1>

            <TopListHeaderTracks 
                country={country}
            />
        </section>
    )
}