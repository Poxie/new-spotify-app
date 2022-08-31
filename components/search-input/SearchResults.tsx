import { useEffect, useState } from 'react';
import { selectAuthToken } from '../../redux/auth/selectors';
import { useAppSelector } from '../../redux/store';
import { SearchResult as SearchResultType } from './SearchInput';
import styles from './SearchInput.module.scss';
import { SearchResult } from './SearchResult';

type ResultItem = {
    id: string;
    name: string;
    image: string;
    extra: string;
    fullItem: SearchResultType;
}
export const SearchResults: React.FC<{
    query: string;
    type: 'track' | 'artist';
    onClick: (result: SearchResultType) => void;
}> = ({ query, type, onClick }) => {
    const token = useAppSelector(selectAuthToken);
    const [results, setResults] = useState<ResultItem[]>([]);

    // Fetching results based on query
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/search?q=${query}&type=${type}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const { [`${type}s`]: { items } } = data;

                const getSpecificProps = (item: any, type: 'track' | 'artist') => {
                    // If is track, return track specific props
                    if(type === 'track') return {
                        image: item.album.images[1]?.url,
                        extra: `Popularity ${item.popularity}`
                    }
                    // Else return artist specific props
                    return {
                        image: item.images[1]?.url,
                        extra: `${item.followers.total.toLocaleString()} followers`
                    }
                }
                
                const resultItems = items.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    fullItem: item,
                    ...getSpecificProps(item, type)
                }));
                setResults(resultItems);
            })
    }, [query, type]);

    return(
        <div className={styles['results']}>
            {results.map(result => (
                <SearchResult 
                    {...result}
                    onClick={() => onClick(result.fullItem)}
                    key={result.id}
                />
            ))}
        </div>
    )
}