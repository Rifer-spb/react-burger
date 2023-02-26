import {
    CREATE_ORDER,
    CREATE_ORDER_FAILED,
    CREATE_ORDER_SUCCESS
} from './constants';
import { createOrder } from "../../utils/api";
import { addIngredient, dropIngredient, initPrice, add } from "../slices/orderSlice";
import {checkResponse} from "../../utils/helpers/helperRequest";

export function setIngredient(id) {
    return function (dispatch, getState) {
        const state = getState();
        const ingredients = state.ingredient.ingredients;
        const ingredient = ingredients.find(item => item['_id'] === id);
        if(!ingredient) return;
        dispatch(addIngredient(ingredient));
        dispatch(initPrice());
    }
}

export function deleteIngredient(id) {
    return function (dispatch) {
        dispatch(dropIngredient(id));
        dispatch(initPrice());
    }
}

export function create(fields) {
    return function(dispatch) {
        dispatch(add({
            type: CREATE_ORDER
        }));
        createOrder(fields)
            .then(response => checkResponse(response))
            .then( response  => {
                if (response && response.success) {
                    dispatch(add({
                        type: CREATE_ORDER_SUCCESS,
                        order: response.order
                    }))
                } else {
                    dispatch(add({
                        type: CREATE_ORDER_FAILED
                    }))
                }
            }).catch( err => {
            console.log(err);
            dispatch(add({
                type: CREATE_ORDER_FAILED,
            }));
        })
    }
}