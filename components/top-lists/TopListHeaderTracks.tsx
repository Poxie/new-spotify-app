import styles from '../../styles/TopLists.module.scss';
import { useAppSelector } from "../../redux/store";
import { selectTopList } from "../../redux/top-lists/hooks";
import { TrackPlayer } from "../track-player/TrackPlayer";

export const TopListHeaderTracks: React.FC<{
    country: string;
}> = ({ country }) => {
    const tracks = useAppSelector(state => selectTopList(state, country)).slice(0,4);

    return(
        <div className={styles['header-tracks']}>
            {tracks.length === 0 && (
                <>
                {Array.from(Array(4)).map((_, key) => (
                    <TrackPlayer 
                        className={styles['header-track']}
                        loading={true}
                        key={key}
                    />
                ))}
                </>
            )}

            {tracks.map(track => (
                <TrackPlayer 
                    {...track}
                    className={styles['header-track']}
                    key={track.id}
                />
            ))}
        </div>
    )
}