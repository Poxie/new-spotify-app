import { Artist, Track } from "../../types";

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