import styles from '../../styles/Navbar.module.scss';
import Button from "../button"

export const NavbarLoginButton = () => {
    return(
        <Button className={styles.button} href={'/login'}>
            Login with Spotify
        </Button>
    )
}