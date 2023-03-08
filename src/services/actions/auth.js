import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_ERROR
} from './constants';

import { loadUser, clearUser } from "../slices/authSlice";
import {registerRequest, loginRequest, logoutRequest} from "../../utils/api/auth";
import { checkResponse } from "../../utils/helpers/helperRequest";
import {deleteCookie, getCookie, setCookie} from "../../utils/cookies";

export function register(formData) {
    return function(dispatch) {
        dispatch(loadUser({
            type: AUTH_REQUEST
        }));
        registerRequest(formData)
            .then(response => checkResponse(response))
            .then( response  => {
                if (response && response.success) {
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
            }).catch( err => {
            console.log(err);
            dispatch(loadUser({
                type: AUTH_ERROR,
                message: err.message
            }));
        })
    }
}

export function login(formData) {
    return function(dispatch) {
        dispatch(loadUser({
            type: AUTH_REQUEST
        }));
        loginRequest(formData)
            .then(response => checkResponse(response))
            .then( response  => {
                if (response && response.success) {
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
            }).catch( err => {
            console.log(err);
            dispatch(loadUser({
                type: AUTH_ERROR,
                message: err.message
            }));
        })
    }
}

export function logout() {
    return async function(dispatch) {
        await logoutRequest({
            token: getCookie('refreshToken')
        });
        dispatch(clearUser());
        deleteCookie('token');
        deleteCookie('refreshToken');
    }
}