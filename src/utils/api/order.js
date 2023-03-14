import { URL_ORDERS } from "./constants";
import { request } from "../helpers/helperRequest";

export function createOrder(fields) {
    return request(URL_ORDERS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(fields)
    });
}
