import {
    LOAD_INGREDIENTS,
    LOAD_INGREDIENTS_FAILED,
    LOAD_INGREDIENTS_SUCCESS
} from './constants';

import { getIngredients} from "../../utils/api";
import { loadItems } from "../slices/ingredientSlice";
import { checkResponse } from "../../utils/services/helperRequest";

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
                        items: response.data
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