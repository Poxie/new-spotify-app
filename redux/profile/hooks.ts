import { RootState } from "../store";

export const selectProfile = (state: RootState) => state.profile.profile;
export const selectProfileToken = (state: RootState, type: string) => state.profile.tokens[type];

export const selectProfileArtists = (state: RootState) => state.profile.artists[state.profile.activeTerm.artists];
export const selectProfileTracks = (state: RootState) => state.profile.tracks[state.profile.activeTerm.tracks];
export const selectProfileActiveArtistTerm = (state: RootState) => state.profile.activeTerm.artists;
export const selectProfileActiveTracksTerm = (state: RootState) => state.profile.activeTerm.tracks;