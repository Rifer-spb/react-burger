import {
    URL_AUTH_REGISTER,
    URL_AUTH_PASSWORD_RESET,
    URL_AUTH_PASSWORD_RESET_RESET,
    URL_AUTH_LOGIN,
    URL_AUTH_LOGOUT,
    URL_AUTH_GET_USER,
    URL_AUTH_REFRESH_TOKEN
} from "./constants";
import {deleteCookie, getCookie, setCookie} from "../cookies";
import {checkResponse} from "../helpers/helperRequest";

export function forgotPasswordRequest(formData) {
    return fetch(URL_AUTH_PASSWORD_RESET, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
    });
}

export function resetPasswordRequest(formData) {
    return fetch(URL_AUTH_PASSWORD_RESET_RESET, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
    });
}

export function registerRequest(formData) {
    return fetch(URL_AUTH_REGISTER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
    })
        .then((res) => checkResponse(res))
        .then(res => {
            if (res.success) {
                setCookie('token', res.accessToken.split('Bearer ')[1]);
                setCookie('refreshToken', res.refreshToken);
            }
            return res;
        });
}

export function loginRequest(formData) {
    return fetch(URL_AUTH_LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
    })
        .then((res) => checkResponse(res))
        .then(res => {
            if (res.success) {
                setCookie('token', res.accessToken.split('Bearer ')[1]);
                setCookie('refreshToken', res.refreshToken);
            }
            return res;
        });
}

export function logoutRequest() {
    return fetch(URL_AUTH_LOGOUT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ token: getCookie('refreshToken') })
    })
        .then((res) => checkResponse(res))
        .then(res => {
            deleteCookie('token');
            deleteCookie('refreshToken');
            return res;
        });
}

export function getUserRequest() {
    return fetchWithRefreshToken(URL_AUTH_GET_USER,{
        method : 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('token')
        }
    })
}

export function updateUserRequest(formData) {
    return fetchWithRefreshToken(URL_AUTH_GET_USER,{
        method : 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('token')
        },
        body: JSON.stringify(formData)
    })
}


/*****************************************************************************/

const fetchWithRefreshToken = async (url, config) => {
    return fetch(url, config).then(res => {
        if (!res.ok) {
            if(res.status === 401 || res.status === 403) {
                return refreshTokenRequest()
                    .then(res => res.json())
                    .then(res => {
                        if (res.success) {
                            setCookie('token', res.accessToken.split('Bearer ')[1]);
                            setCookie('refreshToken', res.refreshToken);
                            config.headers.Authorization = res.accessToken;
                            return fetch(url, config).then((res) => checkResponse(res))
                        } else {
                            deleteCookie('token');
                            deleteCookie('refreshToken');
                            window.location.reload();
                        }
                    });
            }
        }
        return res.json();
    });
};

export const refreshTokenRequest = () => {
    return fetch(URL_AUTH_REFRESH_TOKEN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token : getCookie('refreshToken')
        }),
    })
};