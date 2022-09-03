import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { selectAuthToken } from '../../redux/auth/selectors';
import { setProfileToken } from '../../redux/profile/action';
import { selectProfileToken } from '../../redux/profile/hooks';
import { useAppSelector } from '../../redux/store';
import { AuthContext as AuthContextType } from './types';

const AuthContext = React.createContext({} as AuthContextType);

export const useAuth = () => React.useContext(AuthContext);

const refreshToken = async (refresh_token: string) => {
    const response = await fetch(`/api/refresh_token`, {
        method: 'POST',
        body: JSON.stringify({ refresh_token })
    });
    const data = await response.json();
    const token = data.access_token;
    localStorage.accessToken = token;
    return token;
}
export const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
    const tokenData = useAppSelector(state => selectProfileToken(state, 'access_token'));
    const dispatch = useDispatch();

    // Setting access token on window load
    useEffect(() => {
        dispatch(setProfileToken({
            type: 'access_token',
            token: localStorage.getItem('accessToken') || null,
            refresh_token: localStorage.getItem('refreshToken') || null
        }));
    }, []);

    // Function to get auth related content
    const get: AuthContextType['get'] = useCallback(async (query, external) => {
        if(!tokenData?.token) return;

        // Making get request
        const url = external ? query : `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${query}`;
        return await fetch(url, {
            headers: {
                'Authorization': `Bearer ${tokenData.token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(res => res.json())
        .then(async res => {
            if(res.error) {
                // Updating token
                const token = await refreshToken(tokenData.refresh_token);
                dispatch(setProfileToken({
                    type: 'access_token',
                    token
                }));

                // Making new request
                return get(query);
            }
            return res;
        })
    }, [tokenData?.token, tokenData?.refresh_token]);

    const value = {
        get
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}