import { AnyAction } from "@reduxjs/toolkit";
import { ProfileState } from "./types";

const initialState = {
    profile: null,
    artists: {},
    tracks: {},
    recentlyPlayed: [],
    tokens: {}
} as ProfileState;

export const profileReducer = (state=initialState, action: AnyAction) => {
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
                        token
                    }
                }
            }
        }
        default:
            return state;
    }
}