import { BASE_URL } from "../api/constants";

export const REQUEST_ERROR = 'Request error';

// создаем функцию проверки ответа на `ok`
export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return res.json().then((err) => Promise.reject(err));
};

// создаем функцию проверки на `success`
export const checkSuccess = (res) => {
    if (res && res.success) {
        return res;
    }
    // не забываем выкидывать ошибку, чтобы она попала в `catch`
    return Promise.reject(`Ответ не success: ${res}`);
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
// В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
export const request = (endpoint, options) => {
    // а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
    return requestOnly(endpoint, options)
        .then(checkResponse)
        .then(checkSuccess);
};

export const requestOnly = (endpoint, options) => {
    // а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
    return fetch(`${BASE_URL}${endpoint}`, options);
};