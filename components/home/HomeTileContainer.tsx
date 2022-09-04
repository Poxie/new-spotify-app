import styles from '../../styles/Home.module.scss';
import { HomeTile } from "./HomeTile"

const tiles = [
    { title: 'View top lists all around the world', content: 'There are different music cultures all around the world. Perhaps it’s time to explore some of those?', img: 'tile-one', icon: 'top-lists', path: '/top-lists', buttonText: 'View top lists' },
    { title: 'View your personal music statistics', content: 'View your own listening statistics, including recently played songs, and most listened songs artists.', img: 'tile-two', icon: 'stats', path: '/profile', buttonText: 'View your stats' },
    { title: 'Expand your playlists with your own taste', content: 'Get personalized recommendations based on your recently listened songs, or your all-time favorites.', img: 'tile-three', icon: 'recommendations', path: '/profile?tab=recommendations', buttonText: 'Get recommendations' }
]
export type TileType = typeof tiles[0];
export const HomeTileContainer = () => {
    return(
        <div className={styles.tiles}>
            {tiles.map(tile => (
                <HomeTile 
                    {...tile}
                    key={tile.title}
                />
            ))}
        </div>
    )
}