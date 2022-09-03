import { RootState } from "../store";

export const selectProfile = (state: RootState) => state.profile.profile;
export const selectProfileToken = (state: RootState, type: string) => state.profile.tokens[type];