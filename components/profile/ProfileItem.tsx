import styles from '../../styles/Profile.module.scss';
import Image from "next/image";

export const ProfileItem: React.FC<{
    image?: string;
    name?: string;
    uri?: string;
    loading?: boolean;
}> = ({ name, uri, image, loading }) => {
    if(loading) {
        return(
            <div className={styles['top-item']}>
                <div className={styles['top-image']} />
                <div className={styles['top-item-name-loading']} />
            </div>
        )
    }

    return(
        <div className={styles['top-item']}>
            <a 
                className={styles['top-image']} 
                href={uri}
            >
                <Image 
                    src={image || ''}
                    layout={'fill'}
                    objectFit={'cover'}
                />
            </a>
            <a 
                className={styles['top-item-name']}
                href={uri}
            >
                {name}
            </a>
        </div>
    )
}