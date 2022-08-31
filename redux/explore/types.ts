import { AnyAction } from "@reduxjs/toolkit";
import { Album, Artist, Track } from "../../types"

export type ExploreState = {
    songs: {
        artist: null | Artist;
        track: null | Track;
        results: Track[];
    }
    artists: {
        artist: null | Artist;
        relatedArtists: Artist[];
        albums: Album[];
        popularSongs: Track[];
    }
}

export type ExploreReducer = (state: ExploreState, action: AnyAction) => ExploreState;