import { AnyAction } from "@reduxjs/toolkit";
import { Artist, Track } from "../../types"

export type ExploreState = {
    songs: {
        artist: null | Artist;
        track: null | Track;
        results: Track[];
    }
}

export type ExploreReducer = (state: ExploreState, action: AnyAction) => ExploreState;