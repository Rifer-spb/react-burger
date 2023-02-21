const URL_DOMAIN = 'https://norma.nomoreparties.space';
const URL_INGREDIENTS = URL_DOMAIN + '/api/ingredients';
const URL_ORDERS = URL_DOMAIN + '/api/orders';

export function getIngredients() {
    return fetch(URL_INGREDIENTS);
}

export function createOrder(fields) {
    return fetch(URL_ORDERS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(fields)
    });
}