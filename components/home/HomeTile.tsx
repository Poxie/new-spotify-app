import Image from 'next/image';
import styles from '../../styles/Home.module.scss';
import Button from '../button';
import { TileType } from './HomeTileContainer';

export const HomeTile: React.FC<TileType> = ({ title, content, img, icon, path, buttonText }) => {
    return(
        <div className={styles.tile}>
            <div className={styles['tile-text']}>
                <h2>
                    {title}
                </h2>
                <p>
                    {content}
                </p>
                <Button 
                    className={styles['tile-button']} 
                    ariaLabel={buttonText}
                    href={path} 
                >
                    <Image 
                        src={`/icons/${icon}.svg`}
                        width={20}
                        height={20}
                        alt={`Go to ${buttonText} icon`}
                    />
                    {buttonText}
                </Button>
            </div>
            <div className={styles['tile-image']}>
                <Image 
                    src={`/imgs/${img}.png`}
                    layout={'fill'}
                    objectFit={'cover'}
                    alt={`Image related to ${title}`}
                />
            </div>
        </div>
    )
}