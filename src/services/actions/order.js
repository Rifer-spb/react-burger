import { setIngredients } from "../slices/orderSlice";

export function addIngredients(items) {
    return function (dispatch) {
        dispatch(setIngredients(items));
    }
}