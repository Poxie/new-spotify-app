import styles from '../../styles/Explore.module.scss';

export const ExploreHeader = () => {
    return(
        <h1 className={styles['header']}>
            Explore what <span className={styles['highlight']}>YOU</span> love.
        </h1>
    )
}