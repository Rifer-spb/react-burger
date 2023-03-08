import { useContext, useState, createContext } from 'react';
import { deleteCookie, setCookie } from '../utils/cookies';
import React from 'react';
import { loginRequest, getUserRequest, logoutRequest } from '../utils/api/auth';
import {checkResponse} from "../utils/helpers/helperRequest";
import {loadUser} from "./slices/authSlice";
import {AUTH_ERROR, AUTH_SUCCESS} from "./actions/constants";

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useProvideAuth() {

    const [user, setUser] = useState(null);

    const getUser = async () => {
        return await getUserRequest()
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setUser(data.user);
                }
                return data.success;
            });
    };

    const login = async form => {
        const data = await loginRequest(form)
            .then(response => checkResponse(response))
            .then(res => {
                if (res && res.success) {
                    dispatch(loadUser({
                        type: AUTH_SUCCESS,
                        user: response.user
                    }));
                    if (response.accessToken.indexOf('Bearer') === 0) {
                        setCookie('token', response.accessToken.split('Bearer ')[1]);
                        setCookie('refreshToken', response.refreshToken);
                    }
                } else {
                    dispatch(loadUser({
                        type: AUTH_ERROR,
                        message: response.message
                    }))
                }

                let authToken;
                res.headers.forEach(header => {
                    if (header.indexOf('Bearer') === 0) {
                        authToken = header.split('Bearer ')[1];
                    }
                });
                if (authToken) {
                    setCookie('token', authToken);
                    setCookie('refreshToken', authToken);
                }
                return res.json();
            })
            .then(data => data);

        if (data.success) {
            setUser(data.user);
        }
    };

    const logout = async () => {
        await logoutRequest();
        setUser(null);
        deleteCookie('token');
        deleteCookie('refreshToken');
    };

    return {
        user,
        getUser,
        signIn,
        signOut
    };
}