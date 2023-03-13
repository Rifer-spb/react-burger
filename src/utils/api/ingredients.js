import { URL_INGREDIENTS } from "./constants";
import { request } from "../helpers/helperRequest";

export function getIngredients() {
    return request(URL_INGREDIENTS);
}