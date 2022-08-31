import { useState } from 'react';
import styles from '../../styles/Explore.module.scss';
import { ExploreSongSelector } from './ExploreSongSelector';

export const ExploreSongs = () => {
    return(
        <>
        <h2 className={styles['sub-header']}>
            Get songs related to a particular song and artist. We will suggest songs you may like based of your input.
        </h2>

        <div className={styles['selectors']}>
            <ExploreSongSelector 
                type={'track'}
                onChange={console.log}
            />
            <ExploreSongSelector 
                type={'artist'}
                onChange={console.log}
            />
        </div>
        </>
    )
}