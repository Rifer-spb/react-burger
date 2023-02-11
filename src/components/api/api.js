const URL_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';

export function getIngredients() {
    return fetch(URL_INGREDIENTS);
}