import { Profile } from "../../types";

export const setProfile = (profile: Profile) => ({
    type: 'SET_PROFILE',
    payload: profile
})

export const setProfileToken = (payload: {
    type: string;
    token: string | null;
    refresh_token?: string | null;
}) => ({
    type: 'SET_PROFILE_TOKEN',
    payload
});