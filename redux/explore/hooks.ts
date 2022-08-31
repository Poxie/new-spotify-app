import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectExploreSongTrack = (state: RootState) => state.explore.songs.track;
export const selectExploreSongArtist = (state: RootState) => state.explore.songs.artist;
export const selectExploreSongResults = (state: RootState) => state.explore.songs.results;
export const selectExploreSongValid = createSelector(
    [selectExploreSongTrack, selectExploreSongArtist],
    (track, artist) => track && artist
);