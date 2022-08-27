import styles from '../../styles/Navbar.module.scss';
import { NavbarTabs } from './NavbarTabs';

export const NavbarRight = () => {
    return(
        <div className={styles.right}>
            <NavbarTabs />
        </div>
    )
}