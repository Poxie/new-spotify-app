import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Navbar.module.scss';

const tabs = ['Top Lists', 'Explore', 'Profile'];
export const NavbarTabs = () => {
    const asPath = useRouter().asPath;

    return(
        <ul className={styles.tabs}>
            {tabs.map(tab => {
                const path = `/${tab.toLowerCase().replaceAll(' ', '-')}`;
                const active = path === asPath;

                const className = [
                    styles['tab'],
                    active ? styles['active'] : ''
                ].join(' ');
                return(
                    <li 
                        className={className} 
                        key={tab}
                    >
                        <Link href={path}>
                            {tab}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}