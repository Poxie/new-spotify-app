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

export const setProfileActiveTerm = (payload: {
    type: 'artists' | 'tracks',
    term: string;
}) => ({
    type: 'SET_PROFILE_ACTIVE_TERM',
    payload
})

export const setProfileRecommendationsTerm = (payload: {
    type: 'artistTerm' | 'trackTerm';
    term: string;
}) => ({
    type: 'SET_PROFILE_RECOMMENDATION_TERM',
    payload
})

export const setProfileRecommendations = (items: Track[]) => ({
    type: 'SET_PROFILE_RECOMMENDATIONS',
    payload: items
})