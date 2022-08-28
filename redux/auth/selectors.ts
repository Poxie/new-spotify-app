import { RootState } from "../store";

export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthTokenLoading = (state: RootState) => state.auth.loading;