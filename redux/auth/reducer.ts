import { AnyAction } from "@reduxjs/toolkit"

const initialState = {
    token: null,
    loading: true
}

export const authReducer: any = (state=initialState, action: AnyAction) => {
    switch(action.type) {
        case 'SET_AUTH_TOKEN': {
            return {
                ...state,
                token: action.payload,
                loading: false
            }
        }
        default:
            return state;
    }
}