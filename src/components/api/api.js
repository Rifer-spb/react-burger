const URL_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';
const URL_ORDERS = 'https://norma.nomoreparties.space/api/orders';

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