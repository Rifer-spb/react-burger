import { combineReducers } from 'redux';
import ingredientSlice from "../slices/ingredientSlice";
import orderSlice from "../slices/orderSlice";
import categorySlice from "../slices/categorySlice";

export const rootReducer = combineReducers({
    ingredient: ingredientSlice,
    order: orderSlice,
    category: categorySlice
});