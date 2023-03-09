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

export function register(formData) {
    return function(dispatch) {
        dispatch(loadUser({
            type: AUTH_REQUEST_LOAD
        }));
        registerRequest(formData)
            .then(response  => {
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

export function login(formData) {
    return function(dispatch) {
        dispatch(loadUser({
            type: AUTH_REQUEST_LOAD
        }));
        loginRequest(formData)
            .then(response  => {
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

export function logout() {
    return async function(dispatch) {
        await logoutRequest();
        dispatch(clearUser());
    }
}

export function getUser() {
    return function(dispatch) {
        dispatch(loadUser({
            type: AUTH_REQUEST_LOAD
        }));
        getUserRequest()
            .then(response  => {
                if (response && response.success) {
                    dispatch(loadUser({
                        type: AUTH_REQUEST_SUCCESS,
                        user: response.user
                    }));
                } else {
                    dispatch(loadUser({
                        type: AUTH_REQUEST_FAILED,
                        message: response.message
                    }));
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

export const clearRequest = createAction('auth/clearRequest', () =>  {
    return {
        payload: {
            load: false,
            failed: false,
            message: ''
        }
    };
});