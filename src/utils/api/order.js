import { URL_DOMAIN } from "./constants";
const URL_ORDERS = URL_DOMAIN + '/api/orders';

export function createOrder(fields) {
    return fetch(URL_ORDERS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(fields)
    });
}
