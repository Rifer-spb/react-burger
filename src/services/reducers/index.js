import { combineReducers } from 'redux';
import ingredientSlice from "../slices/ingredientSlice";
import orderSlice from "../slices/orderSlice";

export const rootReducer = combineReducers({
    ingredient: ingredientSlice,
    order: orderSlice
});