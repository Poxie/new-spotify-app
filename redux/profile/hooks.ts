import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectProfile = (state: RootState) => state.profile.profile;
export const selectProfileToken = (state: RootState, type: string) => state.profile.tokens[type];

export const selectProfileArtists = (state: RootState) => state.profile.artists[state.profile.activeTerm.artists];
export const selectProfileTracks = (state: RootState) => state.profile.tracks[state.profile.activeTerm.tracks];
export const selectProfileActiveArtistTerm = (state: RootState) => state.profile.activeTerm.artists;
export const selectProfileActiveTracksTerm = (state: RootState) => state.profile.activeTerm.tracks;

export const selectProfileRecommendationsLoading = (state: RootState) => state.profile.recommendations.loading;
export const selectProfileRecommendations = (state: RootState) => state.profile.recommendations.items;
export const selectProfileRecommendationsArtistTerm = (state: RootState) => state.profile.recommendations.artistTerm;
export const selectProfileRecommendationsTrackTerm = (state: RootState) => state.profile.recommendations.trackTerm;

export const selectProfileArtistsByTerm = (state: RootState, term: string) => state.profile.artists[term];
export const selectProfileTracksByTerm = (state: RootState, term: string) => state.profile.tracks[term];