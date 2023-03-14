import { combineReducers } from 'redux';
import ingredientSlice from "../slices/ingredientSlice";
import orderSlice from "../slices/orderSlice";
import authSlice from "../slices/authSlice";

export const rootReducer = combineReducers({
    ingredient: ingredientSlice,
    order: orderSlice,
    auth: authSlice
});