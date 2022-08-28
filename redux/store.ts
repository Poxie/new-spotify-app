import {
    $CombinedState,
    Action,
    AnyAction,
    combineReducers,
    configureStore,
    ThunkAction,
  } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { authReducer } from './auth/reducer';
import { AuthState } from './auth/types';
import { topListsReducer } from './top-lists/reducer';
import { TopListsState } from './top-lists/types';

const combinedReducer = combineReducers({
    auth: authReducer,
    topLists: topListsReducer
});

const reducer = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

export const makeStore = () => configureStore({ reducer: reducer as any });

type Store = ReturnType<typeof makeStore>;

// Types based on store
export type RootState = {
    readonly [$CombinedState]?: undefined;
} & {
    auth: AuthState;
    topLists: TopListsState
}
export type AppDispatch = Store['dispatch'];

export const wrapper = createWrapper(makeStore, { debug: false });
