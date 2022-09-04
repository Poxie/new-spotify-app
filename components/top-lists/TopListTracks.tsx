import styles from '../../styles/TopLists.module.scss';
import { useAppSelector } from "../../redux/store";
import { selectTopList } from "../../redux/top-lists/hooks";
import { TopListTrack } from './TopListTrack';
import { useEffect, useState } from 'react';
import Button from '../button';

export const TopListTracks: React.FC<{
    country: string;
}> = ({ country }) => {
    const [count, setCount] = useState(10);
    const tracks = useAppSelector(state => selectTopList(state, country)).slice(4);

    // Resetting count on country change
    useEffect(() => {
        setCount(10);
    }, [country]);

    // Showing more tracks
    const loadMore = () => {
        setCount(prev => prev + 10);
    }

    const visibleTracks = tracks.slice(0, count - 4);
    return(
        <section className={styles['tracks']}>
            <ul className={styles['track-container']}>
                {visibleTracks.length === 0 && (
                    <>
                    {Array.from(Array(6)).map((_, key) => (
                        <TopListTrack 
                            index={key + 5}
                            noAnimation={true}
                            loading={true}
                            key={key}
                        />
                    ))}
                    </>
                )}

                {visibleTracks.map((track, key) => (
                    <TopListTrack 
                        {...track}
                        noAnimation={key <= 5}
                        index={key + 5}
                        key={track.id}
                    />
                ))}
            </ul>
            
            {count < tracks.length && (
                <Button 
                    type={'transparent'} 
                    className={styles['more-button']}
                    onClick={loadMore}
                >
                    Load more
                </Button>
            )}
        </section>
    )
}