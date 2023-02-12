const URL_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredientds';

export function getIngredients() {
    return fetch(URL_INGREDIENTS);
}