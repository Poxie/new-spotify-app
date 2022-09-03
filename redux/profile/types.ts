import { Artist, Profile, Track } from "../../types";

export type ProfileState = {
    profile: null | Profile;
    artists: {[key: string]: Artist[]};
    tracks: {[key: string]: Track[]};
    recentlyPlayed: Track[];
    tokens: {[type: string]: {
        token: string;
        refresh_token: string;
    } | undefined};
};