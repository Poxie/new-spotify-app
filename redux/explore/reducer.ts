import { AnyAction } from "@reduxjs/toolkit";
import { ExploreReducer, ExploreState } from "./types";

const initialState = {
    songs: {
        track: null,
        artist: null,
        results: []
    },
    artists: {
        artist: null,
        relatedArtists: [],
        albums: [],
        popularSongs: []
    }
} as ExploreState;

export const exploreReducer: ExploreReducer = (state=initialState, action: AnyAction) => {
    switch(action.type) {
        case 'SET_EXPLORE_SONG_TRACK': {
            return {
                ...state,
                songs: {
                    ...state.songs,
                    track: action.payload
                }
            }
        }
        case 'SET_EXPLORE_SONG_ARTIST': {
            return {
                ...state,
                songs: {
                    ...state.songs,
                    artist: action.payload
                }
            }
        }
        case 'SET_EXPLORE_SONG_RESULTS': {
            return {
                ...state,
                songs: {
                    ...state.songs,
                    results: action.payload
                }
            }
        }
        case 'SET_EXPLORE_ARTISTS_ARTIST': {
            return {
                ...state,
                artists: {
                    ...state.artists,
                    artist: action.payload
                }
            }
        }
        case 'SET_EXPLORE_ARTISTS_RELATED_ARTIST': {
            return {
                ...state,
                artists: {
                    ...state.artists,
                    relatedArtists: action.payload
                }
            }
        }
        case 'SET_EXPLORE_ARTISTS_ALBUMS': {
            return {
                ...state,
                artists: {
                    ...state.artists,
                    albums: action.payload
                }
            }
        }
        case 'SET_EXPLORE_ARTISTS_POPULAR_SONGS': {
            return {
                ...state,
                artists: {
                    ...state.artists,
                    popularSongs: action.payload
                }
            }
        }
        default:
            return state;
    }
}