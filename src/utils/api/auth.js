import {
    URL_AUTH_REGISTER,
    URL_AUTH_PASSWORD_RESET,
    URL_AUTH_LOGIN,
    URL_AUTH_LOGOUT,
    URL_AUTH_GET_USER
} from "./constants";
import {getCookie} from "../cookies";

export function passwordResetRequest(fields) {
    return fetch(URL_AUTH_PASSWORD_RESET, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(fields)
    });
}

export function registerRequest(formData) {
    return fetch(URL_AUTH_REGISTER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
    });
}

export function loginRequest(formData) {
    return fetch(URL_AUTH_LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
    });
}

export function logoutRequest(formData) {
    return fetch(URL_AUTH_LOGOUT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
    });
}

export function getUserRequest() {
    return fetch(URL_AUTH_GET_USER, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('token')
        }
    });
}