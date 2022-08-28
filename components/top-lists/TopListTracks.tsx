import styles from '../../styles/TopLists.module.scss';
import { useAppSelector } from "../../redux/store";
import { selectTopList } from "../../redux/top-lists/hooks";
import { TopListTrack } from './TopListTrack';

export const TopListTracks: React.FC<{
    country: string;
}> = ({ country }) => {
    const tracks = useAppSelector(state => selectTopList(state, country)).slice(5);

    return(
        <section className={styles['tracks']}>
            <ul className={styles['track-container']}>
                {tracks.map((track, key) => (
                    <TopListTrack 
                        {...track}
                        index={key + 6}
                        key={track.id}
                    />
                ))}
            </ul>
        </section>
    )
}