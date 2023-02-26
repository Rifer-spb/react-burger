export const REQUEST_ERROR = 'Request error';

export function checkResponse(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}