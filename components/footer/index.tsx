import styles from '../../styles/Footer.module.scss';

export const Footer = () => {
    return(
        <footer className={styles.container}>
            <span>
                All information on this site is fetched from Spotify.
            </span>
        </footer>
    )
}