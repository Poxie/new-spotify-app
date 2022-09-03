import { RootState } from "../store";

export const selectProfile = (state: RootState) => state.profile.profile;
export const selectProfileToken = (state: RootState, type: string) => state.profile.tokens[type];

export const selectProfileArtists = (state: RootState, term: 'long_term' | 'medium_term' | 'short_term') => state.profile.artists[term];
export const selectProfileTracks = (state: RootState, term: 'long_term' | 'medium_term' | 'short_term') => state.profile.tracks[term];