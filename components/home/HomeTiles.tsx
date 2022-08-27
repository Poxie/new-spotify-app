import { HomeTileContainer } from "./HomeTileContainer"
import styles from '../../styles/Home.module.scss';

export const HomeTiles = () => {
    return(
        <section className={styles['tile-section']}>
            <h2 className={styles['tile-section-header']}>
                All you want: right here, right now.
            </h2>
            <HomeTileContainer />
        </section>
    )
}