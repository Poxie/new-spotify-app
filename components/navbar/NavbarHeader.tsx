import styles from '../../styles/Navbar.module.scss';
import Link from "next/link"
import { SiteIcon } from '../../assets/icons/SiteIcon';

export const NavbarHeader = () => {
    return(
        <Link href={'/'}>
            <a className={styles.header} aria-label="Go to home page">
                <SiteIcon />
                <span>
                    {process.env.NEXT_PUBLIC_WEBSITE_NAME.toLowerCase()}
                </span>
            </a>
        </Link>
    )
}