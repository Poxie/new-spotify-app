import { Album, Artist, Track } from "../../types";

export const setExploreSongTrack = (track: Track) => ({
    type: 'SET_EXPLORE_SONG_TRACK',
    payload: track
})
export const setExploreSongArtist = (artist: Artist) => ({
    type: 'SET_EXPLORE_SONG_ARTIST',
    payload: artist
})
export const setExploreSongResults = (results: Track[]) => ({
    type: 'SET_EXPLORE_SONG_RESULTS',
    payload: results
})

export const setExploreArtistsArtist = (artist: Artist) => ({
    type: 'SET_EXPLORE_ARTISTS_ARTIST',
    payload: artist
})
export const setExploreArtistsRelatedArtists = (artists: Artist[]) => ({
    type: 'SET_EXPLORE_ARTISTS_RELATED_ARTIST',
    payload: artists
})
export const setExploreArtistsAlbums = (albums: Album[]) => ({
    type: 'SET_EXPLORE_ARTISTS_ALBUMS',
    payload: albums
})
export const setExploreArtistsPopularSongs = (tracks: Track[]) => ({
    type: 'SET_EXPLORE_ARTISTS_POPULAR_SONGS',
    payload: tracks
})