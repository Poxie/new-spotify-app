import Image from 'next/image';
import styles from '../../styles/Home.module.scss';
import { HomeHeader } from './HomeHeader';

export const Home = () => {
    return(
        <div className={styles.container}>
            <HomeHeader />
        </div>
    )
}