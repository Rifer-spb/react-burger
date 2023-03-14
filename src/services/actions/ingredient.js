import {
    LOAD_INGREDIENTS,
    LOAD_INGREDIENTS_FAILED,
    LOAD_INGREDIENTS_SUCCESS
} from './constants';

import { getIngredients } from "../../utils/api/ingredients";
import { loadItems } from "../slices/ingredientSlice";
import {createAction} from "@reduxjs/toolkit";

export function loadIngredients() {
    return function(dispatch) {
        dispatch(loadItems({
            type: LOAD_INGREDIENTS
        }));
        getIngredients()
            .then(response  => {
                dispatch(loadItems({
                    type: LOAD_INGREDIENTS_SUCCESS,
                    ingredients: response.data
                }))
            }).catch( err => {
                console.log(err);
                dispatch(loadItems({
                    type: LOAD_INGREDIENTS_FAILED,
                }));
            })
    }
}

export const setCurrentIngredient = createAction('ingredient/setCurrent', (item) =>  {
    return { payload: item ? {...item} : null };
});