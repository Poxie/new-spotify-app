import Image from 'next/image';
import styles from '../../styles/Home.module.scss';
import { HomeContact } from './HomeContact';
import { HomeHeader } from './HomeHeader';
import { HomeTiles } from './HomeTiles';

export const Home = () => {
    return(
        <main>
            <HomeHeader />
            <HomeTiles />
            <HomeContact />
        </main>
    )
}