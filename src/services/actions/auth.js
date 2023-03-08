import {
    AUTH_REQUEST_LOAD,
    AUTH_REQUEST_SUCCESS,
    AUTH_REQUEST_FAILED
} from './constants';

import { checkResponse } from "../../utils/helpers/helperRequest";
import { loadUser, clearUser } from "../slices/authSlice";
import {getUserRequest, loginRequest, logoutRequest, registerRequest} from "../../utils/api/auth";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookies";

export function register(formData) {
    return function(dispatch) {
        dispatch(loadUser({
            type: AUTH_REQUEST_LOAD
        }));
        registerRequest(formData)
            .then(response => checkResponse(response))
            .then( response  => {
                if (response && response.success) {
                    dispatch(loadUser({
                        type: AUTH_REQUEST_SUCCESS,
                        user: response.user
                    }));
                    setCookie('token', response.accessToken.split('Bearer ')[1]);
                    setCookie('refreshToken', response.refreshToken);
                } else {
                    dispatch(loadUser({
                        type: AUTH_REQUEST_FAILED,
                        message: response.message
                    }))
                }
            }).catch( err => {
            console.log(err);
            dispatch(loadUser({
                type: AUTH_REQUEST_FAILED,
                message: err.message
            }));
        })
    }
}

export function login(formData) {
    return function(dispatch) {
        dispatch(loadUser({
            type: AUTH_REQUEST_LOAD
        }));
        loginRequest(formData)
            .then(response => checkResponse(response))
            .then( response  => {
                if (response && response.success) {
                    dispatch(loadUser({
                        type: AUTH_REQUEST_SUCCESS,
                        user: response.user
                    }));
                    setCookie('token', response.accessToken.split('Bearer ')[1]);
                    setCookie('refreshToken', response.refreshToken);
                } else {
                    dispatch(loadUser({
                        type: AUTH_REQUEST_FAILED,
                        message: response.message
                    }))
                }
            }).catch( err => {
            console.log(err);
            dispatch(loadUser({
                type: AUTH_REQUEST_FAILED,
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

export function getUser() {
    return function(dispatch) {
        dispatch(loadUser({
            type: AUTH_REQUEST_LOAD
        }));
        getUserRequest()
            .then(response => checkResponse(response))
            .then( response  => {
                if (response && response.success) {
                    dispatch(loadUser({
                        type: AUTH_REQUEST_SUCCESS,
                        user: response.user
                    }));
                } else {
                    dispatch(loadUser({
                        type: AUTH_REQUEST_FAILED,
                        message: response.message
                    }))
                }
            }).catch( err => {
            console.log(err);
            dispatch(loadUser({
                type: AUTH_REQUEST_FAILED,
                message: err.message
            }));
        })
    }
}