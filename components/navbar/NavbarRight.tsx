import styles from '../../styles/Navbar.module.scss';
import Button from '../button';
import { NavbarTabs } from './NavbarTabs';

export const NavbarRight = () => {
    return(
        <div className={styles.right}>
            <NavbarTabs />
            <Button>
                Login with Spotify
            </Button>
        </div>
    )
}