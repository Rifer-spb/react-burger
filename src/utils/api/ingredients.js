import { URL_DOMAIN } from "./constants";
const URL_INGREDIENTS = URL_DOMAIN + '/api/ingredients';

export function getIngredients() {
    return fetch(URL_INGREDIENTS);
}