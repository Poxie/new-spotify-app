import { AnyAction } from "@reduxjs/toolkit";
import { Artist, Profile, Track } from "../../types";

export type ProfileState = {
    profile: null | Profile;
    artists: {[key: string]: Artist[]};
    tracks: {[key: string]: Track[]};
    activeTerm: {
        artists: string;
        tracks: string;
    }
    recentlyPlayed: Track[];
    tokens: {[type: string]: {
        token: string;
        refresh_token: string;
    } | undefined};
};
export type ProfileReducer = (state: ProfileState, action: AnyAction) => ProfileState