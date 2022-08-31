import { setExploreSongArtist, setExploreSongTrack } from '../../redux/explore/actions';
import { selectExploreSongValid } from '../../redux/explore/hooks';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import styles from '../../styles/Explore.module.scss';
import { ExploreSongResults } from './ExploreSongResults';
import { ExploreSongSelector } from './ExploreSongSelector';

export const ExploreSongs = () => {
    const valid = useAppSelector(selectExploreSongValid);

    return(
        <>
        <h2 className={styles['sub-header']}>
            Get songs related to a particular song and artist. We will suggest songs you may like based of your input.
        </h2>

        <div className={styles['selectors']}>
            <ExploreSongSelector 
                type={'track'}
            />
            <ExploreSongSelector 
                type={'artist'}
            />
        </div>

        {valid && (
            <ExploreSongResults />
        )}
        </>
    )
}