import { Artist, Profile, Track } from "../../types";

export const setProfile = (profile: Profile) => ({
    type: 'SET_PROFILE',
    payload: profile
})

export const setProfileToken = (payload: {
    type: string;
    token: string | null;
    refresh_token?: string | null;
}) => ({
    type: 'SET_PROFILE_TOKEN',
    payload
});

export const setProfileArtists = (payload: {
    type: 'long_term' | 'medium_term' | 'short_term',
    items: Artist[]
}) => ({
    type: 'SET_PROFILE_ARTISTS',
    payload
})

export const setProfileTracks = (payload: {
    type: 'long_term' | 'medium_term' | 'short_term',
    items: Track[]
}) => ({
    type: 'SET_PROFILE_TRACKS',
    payload
})