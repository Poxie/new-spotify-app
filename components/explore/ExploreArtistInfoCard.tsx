import styles from '../../styles/Explore.module.scss';
import Image from "next/image"

export const ExploreArtistInfoCard: React.FC<{
    image: string;
    title: string;
    subtitle: string;
    uri: string;
    extra?: string;
    header?: string;
    small?: boolean;
}> = ({ image, title, subtitle, uri, extra, header, small }) => {
    const className = [
        styles['artist-card'],
        small ? styles['small'] : ''
    ].join(' ');
    return(
        <div className={className}>
            <a 
                className={styles['artist-card-image']}
                href={uri}
            >
                <Image 
                    src={image}
                    layout={'fill'}
                    objectFit={'cover'}
                />
            </a>
            <div className={styles['artist-card-text']}>
                {header && (
                    <span className={styles['artist-card-header']}>
                        {header}
                    </span>
                )}
                <a 
                    className={styles['artist-card-name']}
                    href={uri}
                >
                    {title}
                </a>
                <span className={styles['artist-card-subtitle']}>
                    {subtitle}
                </span>
                {extra && (
                    <span className={styles['artist-card-extra']}>
                        {extra}
                    </span>
                )}
            </div>
        </div>
    )
}