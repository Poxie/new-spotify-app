import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectExploreSongTrack = (state: RootState) => state.explore.songs.track;
export const selectExploreSongArtist = (state: RootState) => state.explore.songs.artist;
export const selectExploreSongResults = (state: RootState) => state.explore.songs.results;
export const selectExploreSongValid = createSelector(
    [selectExploreSongTrack, selectExploreSongArtist],
    (track, artist) => track && artist
);

export const selectExploreArtistsArtist = (state: RootState) => state.explore.artists.artist;
export const selectExploreArtistsRelatedArtists = (state: RootState) => state.explore.artists.relatedArtists;
export const selectExploreArtistAlbums = (state: RootState) => state.explore.artists.albums;
export const selectExploreArtistsPopuplarSongs = (state: RootState) => state.explore.artists.popularSongs;