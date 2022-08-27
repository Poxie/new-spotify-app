import Link from 'next/link';
import styles from '../../styles/Navbar.module.scss';

const tabs = ['Top Lists', 'Explore', 'Profile'];
export const NavbarTabs = () => {
    return(
        <ul className={styles.tabs}>
            {tabs.map(tab => (
                <li className={styles.tab} key={tab}>
                    <Link href={tab.toLowerCase().replaceAll(' ', '-')}>
                        {tab}
                    </Link>
                </li>
            ))}
        </ul>
    )
}