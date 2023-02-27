import { createAction } from '@reduxjs/toolkit'
import { add } from "../slices/orderSlice";
import {CREATE_ORDER, CREATE_ORDER_FAILED, CREATE_ORDER_SUCCESS} from "./constants";
import {createOrder} from "../../utils/api";
import {checkResponse} from "../../utils/helpers/helperRequest";

export const addItemOrder = createAction('order/addItem', function prepare(item) {
    return {
        payload: {...item},
    }
});

export const dropItemOrder = createAction('order/dropItem', function prepare(index) {
    return {
        payload: { index: index },
    }
});

export const sortItemsOrder = createAction('order/sortItems', function prepare(fromIndex, toIndex) {
    return {
        payload: { fromIndex: fromIndex, toIndex: toIndex },
    }
});

export function addOrder(fields) {
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