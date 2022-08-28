import { AnyAction } from "@reduxjs/toolkit"

const initialState = {
    lists: {}
}

export const topListsReducer: any = (state=initialState, action: AnyAction) => {
    switch(action.type) {
        case 'SET_TOP_LIST': {
            const { listName, tracks } = action.payload;

            return {
                ...state,
                lists: {
                    ...state.lists,
                    [listName]: tracks
                }
            }
        }
        default:
            return state;
    }
}