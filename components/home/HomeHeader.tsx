import Image from 'next/image';
import styles from '../../styles/Home.module.scss';
import Button from '../button';

export const HomeHeader = () => {
    return(
        <div className={styles.header}>
            <h1>
                What does music mean 
                {' '}
                <span className={styles['header-color']}>
                    <span className={styles['header-underline']}>
                        for you
                    </span>
                    ?
                </span>
            </h1>
            <p>
                Music is different for everyone. Are you interested in exploring others’ taste in music, or would you rather get a better insight in your own taste in music? 
            </p>
            <div className={styles['header-buttons']}>
                <Button 
                    className={styles['header-button']}
                >
                    View my stats
                </Button>
                <Button 
                    className={styles['header-button']} 
                    type={'secondary'}
                >
                    Explore mode
                </Button>
            </div>

            <div className={styles.separator} aria-hidden="true">
                <Image 
                    src={'/icons/separator.svg'}
                    layout={'fill'}
                    objectFit={'cover'}
                />
            </div>
        </div>
    )
}