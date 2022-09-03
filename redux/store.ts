import {
    $CombinedState,
    Action,
    AnyAction,
    combineReducers,
    configureStore,
    ThunkAction,
  } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { authReducer } from './auth/reducer';
import { AuthState } from './auth/types';
import { topListsReducer } from './top-lists/reducer';
import { TopListsState } from './top-lists/types';
import { ExploreState } from './explore/types';
import { exploreReducer } from './explore/reducer';
import { ProfileState } from './profile/types';
import { profileReducer } from './profile/reducer';

const combinedReducer = combineReducers({
    auth: authReducer,
    topLists: topListsReducer,
    explore: exploreReducer,
    profile: profileReducer
});

const reducer = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {
    if (action.type === HYDRATE) {
        // We dont want to override those values
        delete action.payload.explore;
        delete action.payload.topLists;

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
    topLists: TopListsState;
    explore: ExploreState;
    profile: ProfileState;
}

// Hooks
export type AppDispatch = Store['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const wrapper = createWrapper(makeStore, { debug: false });
