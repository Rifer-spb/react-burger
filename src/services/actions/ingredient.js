import {
    LOAD_INGREDIENTS,
    LOAD_INGREDIENTS_FAILED,
    LOAD_INGREDIENTS_SUCCESS
} from './constants';

import { getIngredients} from "../../utils/api";
import { loadItems, setCurrent } from "../slices/ingredientSlice";
import { checkResponse } from "../../utils/helpers/helperRequest";

export function loadIngredients() {
    return function(dispatch) {
        dispatch(loadItems({
            type: LOAD_INGREDIENTS
        }));
        getIngredients()
            .then(response => checkResponse(response))
            .then( response  => {
                if (response && response.success) {
                    dispatch(loadItems({
                        type: LOAD_INGREDIENTS_SUCCESS,
                        ingredients: response.data
                    }))
                } else {
                    dispatch(loadItems({
                        type: LOAD_INGREDIENTS_FAILED
                    }))
                }
            }).catch( err => {
                console.log(err);
                dispatch(loadItems({
                    type: LOAD_INGREDIENTS_FAILED,
                }));
            })
    }
}

export function updateCurrent(item) {
    return function (dispatch) {
        dispatch(setCurrent(item));
    }
}

export function clearCurrent() {
    return function (dispatch) {
        dispatch(setCurrent(null));
    }
}