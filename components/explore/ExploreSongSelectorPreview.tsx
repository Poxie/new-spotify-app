import styles from '../../styles/Explore.module.scss';
import Image from "next/image";

const IMAGE_DIMENSIONS = 100;
export const ExploreSongSelectorPreview: React.FC<{
    loading?: boolean;
    image?: string;
    title?: string;
    subtitle?: string;
    extra?: string;
}> = ({ loading, image, title, subtitle, extra }) => {
    if(loading) return(
        <div className={styles['selector-preview']}>
            <div className={styles['selector-image']} style={{ width: IMAGE_DIMENSIONS, height: IMAGE_DIMENSIONS }} />
            <div className={styles['selector-text']}>
                <div className={styles['loading-selector-title']} />
                <div className={styles['loading-selector-subtitle']} />
                <div className={styles['loading-selector-extra']} />
            </div>
        </div>
    );

    return(
        <div className={styles['selector-preview']}>
            <div 
                className={styles['selector-image']}
                style={{ width: IMAGE_DIMENSIONS, height: IMAGE_DIMENSIONS }}
            >
                <Image 
                    src={image || ''}
                    width={IMAGE_DIMENSIONS}
                    height={IMAGE_DIMENSIONS}
                />
            </div>
            <div className={styles['selector-text']}>
                <span className={styles['selector-title']}>
                    {title}
                </span>
                <span className={styles['selector-subtitle']}>
                    {subtitle}
                </span>
                <span className={styles['selector-extra']}>
                    {extra}
                </span>
            </div>
        </div>
    )
}