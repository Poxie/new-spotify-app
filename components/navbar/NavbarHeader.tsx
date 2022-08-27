import styles from '../../styles/Navbar.module.scss';
import Image from "next/image";
import Link from "next/link"

export const NavbarHeader = () => {
    return(
        <Link href={'/'}>
            <a className={styles.header} aria-label="Go to home page">
                <div className={styles['header-image']}>
                    <Image 
                        src={'/icons/site-icon.svg'} 
                        layout={'fill'} 
                        objectFit={'cover'} 
                    />
                </div>
                <span>
                    {process.env.NEXT_PUBLIC_WEBSITE_NAME.toLowerCase()}
                </span>
            </a>
        </Link>
    )
}