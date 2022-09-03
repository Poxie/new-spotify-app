import { AnyAction } from "@reduxjs/toolkit";
import { ProfileReducer, ProfileState } from "./types";

const initialState = {
    profile: null,
    artists: {},
    tracks: {},
    activeTerm: {
        artists: 'long_term',
        tracks: 'long_term'
    },
    recentlyPlayed: [],
    tokens: {}
} as ProfileState;

export const profileReducer: ProfileReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_PROFILE': {
            return {
                ...state,
                profile: action.payload
            }
        }
        case 'SET_PROFILE_TOKEN': {
            const { type, token, refresh_token } = action.payload

            return {
                ...state,
                tokens: {
                    ...state.tokens,
                    [type]: {
                        ...state.tokens[type],
                        token,
                        refresh_token
                    }
                }
            }
        }
        case 'SET_PROFILE_ARTISTS': {
            const { type, items } = action.payload;
            
            return {
                ...state,
                artists: {
                    ...state.artists,
                    [type]: items
                }
            }
        }
        case 'SET_PROFILE_TRACKS': {
            const { type, items } = action.payload;

            return {
                ...state,
                tracks: {
                    ...state.tracks,
                    [type]: items
                }
            }
        }
        case 'SET_PROFILE_ACTIVE_TERM': {
            const { type, term } = action.payload;

            return {
                ...state,
                activeTerm: {
                    ...state.activeTerm,
                    [type]: term
                }
            }
        }
        default:
            return state;
    }
}