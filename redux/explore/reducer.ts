import { AnyAction } from "@reduxjs/toolkit";
import { ExploreReducer, ExploreState } from "./types";

const initialState = {
    songs: {
        track: null,
        artist: null,
        results: []
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
        default:
            return state;
    }
}