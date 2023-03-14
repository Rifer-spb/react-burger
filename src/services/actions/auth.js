import {
    AUTH_REQUEST_LOAD,
    AUTH_REQUEST_SUCCESS,
    AUTH_REQUEST_FAILED
} from './constants';

import { loadUser, clearUser } from "../slices/authSlice";
import {
    getUserRequest,
    loginRequest,
    logoutRequest,
    registerRequest
} from "../../utils/api/auth";
import {createAction} from "@reduxjs/toolkit";
import { getCookie } from "../../utils/cookies";

export function register(formData,callback) {
    return async dispatch => {
        dispatch(loadUser({
            type: AUTH_REQUEST_LOAD
        }));
        await registerRequest(formData)
            .then(response  => {
                dispatch(loadUser({
                    type: AUTH_REQUEST_SUCCESS,
                    user: response.user
                }));
                callback();
            }).catch( err => {
                console.log(err);
                dispatch(loadUser({
                    type: AUTH_REQUEST_FAILED,
                    message: err.message
                }));
            });
    }
}

export function login(formData, callback) {
    return async dispatch => {
        dispatch(loadUser({
            type: AUTH_REQUEST_LOAD
        }));
        await loginRequest(formData)
            .then(response  => {
                dispatch(loadUser({
                    type: AUTH_REQUEST_SUCCESS,
                    user: response.user
                }));
                callback();
            }).catch( err => {
                console.log(err);
                dispatch(loadUser({
                    type: AUTH_REQUEST_FAILED,
                    message: err.message
                }));
            });
    }
};

export function logout() {
    return async dispatch => {
        await logoutRequest();
        dispatch(clearUser());
    }
}

export function getUser() {
    return function (dispatch) {
        dispatch(loadUser({
            type: AUTH_REQUEST_LOAD
        }));
        getUserRequest()
            .then(response  => {
                dispatch(loadUser({
                    type: AUTH_REQUEST_SUCCESS,
                    user: response.user
                }));
            }).catch( err => {
                console.log(err);
                dispatch(loadUser({
                    type: AUTH_REQUEST_FAILED,
                    message: err.message
                }));
            });
    }
}

export const checkUserAuth = () => (dispatch) => {
    if (getCookie("token")) {
        dispatch(getUser());
    }
};


export const clearRequest = createAction('auth/clearRequest', () =>  {
    return {
        payload: {
            load: false,
            failed: false,
            message: ''
        }
    };
});