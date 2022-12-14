import styles from './SearchInput.module.scss';
import Image from "next/image";

export const SearchResult: React.FC<{
    id: string;
    name: string;
    image: string;
    extra: string;
    onClick: () => void;
}> = ({ id, onClick, name, image, extra }) => {
    return(
        <div className={styles['result']} onClick={onClick}>
            <div className={styles['result-main']}>
                <div className={styles['result-image']}>
                    <Image 
                        src={image}
                        width={60}
                        height={60}
                    />
                </div>
                <span>
                    {name}
                </span>
            </div>
            <span className={styles['result-extra']}>
                {extra}
            </span>
        </div>
    )
}