import { useRouter } from 'next/router'
import styles from '../../styles/Navbar.module.scss'
import { NavbarHeader } from './NavbarHeader'
import { NavbarRight } from './NavbarRight'

const LIGHT_PATHS = ['/'];
export const Navbar = () => {
    const path = useRouter().asPath;

    const className = [
        styles['container'],
        LIGHT_PATHS.includes(path) ? styles['light'] : ''
    ].join(' ');
    return(
        <header className={className}>
            <nav className={styles.content}>
                <NavbarHeader />
                <NavbarRight />
            </nav>
        </header>
    )
}