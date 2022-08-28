import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectId = (_: any, id: string) => id;
export const selectTopLists = (state: RootState) => state.topLists.lists;
export const selectTopList = createSelector(
    [selectTopLists, selectId],
    (items, itemId) => items[itemId]
);