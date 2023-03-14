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
import {checkResponse, request, requestOnly} from "../helpers/helperRequest";

export function registerRequest(formData) {
    return request(URL_AUTH_REGISTER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
    })
        .then(res => {
            setCookie('token', res.accessToken.split('Bearer ')[1]);
            setCookie('refreshToken', res.refreshToken);
            return res;
        });
}

export function loginRequest(formData) {
    return request(URL_AUTH_LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
    })
        .then(res => {
            setCookie('token', res.accessToken.split('Bearer ')[1]);
            setCookie('refreshToken', res.refreshToken);
            return res;
        });
}

export function logoutRequest() {
    return request(URL_AUTH_LOGOUT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ token: getCookie('refreshToken') })
    })
        .then(res => {
            deleteCookie('token');
            deleteCookie('refreshToken');
            return res;
        }).catch( err => {
            console.log('err',err);
            deleteCookie('token');
            deleteCookie('refreshToken');
        });
}

export function updateUserRequest(formData) {
    return request(URL_AUTH_GET_USER,{
        method : 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('token')
        },
        body: JSON.stringify(formData)
    })
}

export function forgotPasswordRequest(formData) {
    return request(URL_AUTH_PASSWORD_RESET, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
    });
}

export function resetPasswordRequest(formData) {
    return request(URL_AUTH_PASSWORD_RESET_RESET, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
    });
}

/*
    Вот тут в функции getUserRequest я не понял как применить функцию request, так как в ней не отследить коды ответов.
    Поетому создал отдельную функию requestOnly. Через нее и ловлю уже 401 или 403 для обновления токена.
    Так или как? Правально я сделал? Или можно еще как-то по другому?
    Другой вариант обновления токена я закоментил ниже. Какой вариант лучше?
*/

export async function getUserRequest() {
    const config = {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('token')
        }
    };
    let response = await requestOnly(URL_AUTH_GET_USER, config);
    if(!response.ok) {
        if(response.status === 401 || response.status === 403) {
            await refreshTokenRequest();
            config.headers.Authorization = 'Bearer ' + getCookie('token');
            response = await requestOnly(URL_AUTH_GET_USER, config);
        }
    }
    return checkResponse(response);
}

/*
export function getUserRequest() {
    return requestWithRefreshToken(URL_AUTH_GET_USER,{
        method : 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('token')
        }
    });
}
*/
/*****************************************************************************/

export const refreshTokenRequest = () => {
    return request(URL_AUTH_REFRESH_TOKEN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token : getCookie('refreshToken')
        }),
    })
        .then(res => {
            setCookie('token', res.accessToken.split('Bearer ')[1]);
            setCookie('refreshToken', res.refreshToken);
        }).catch(err => {
            deleteCookie('token');
            deleteCookie('refreshToken');
            window.location.reload();
        });
};

/*
const requestWithRefreshToken = async (url, config) => {
    return requestOnly(url, config).then(res => {
        if (!res.ok) {
            if(res.status === 401 || res.status === 403) {
                return refreshTokenRequest()
                    .then(res => res.json())
                    .then(res => {
                        if (res.success) {
                            setCookie('token', res.accessToken.split('Bearer ')[1]);
                            setCookie('refreshToken', res.refreshToken);
                            config.headers.Authorization = res.accessToken;
                            return requestOnly(url, config).then((res) => checkResponse(res))
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
    return requestOnly(URL_AUTH_REFRESH_TOKEN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token : getCookie('refreshToken')
        }),
    })
};
*/