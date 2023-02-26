import { createSlice } from '@reduxjs/toolkit';
import {
    CREATE_ORDER,
    CREATE_ORDER_FAILED,
    CREATE_ORDER_SUCCESS
} from '../actions/constants';

const initialState = {
    id: null,
    name: null,
    price: 0,
    ingredients: [],
    view: false,
    requestLoad: false,
    requestFailed: false
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addIngredient(state, action) {
            const newIngredient = action.payload;
            if(newIngredient.type === 'bun') {
                const bun = state.ingredients.find(item => item.type === 'bun');
                if(!bun) {
                    state.ingredients.push({
                        id: newIngredient['_id'],
                        type: newIngredient.type,
                        price: newIngredient.price,
                        count: 2
                    });
                } else {
                    bun.id = newIngredient['_id'];
                    bun.count = 2;
                }
            } else {
                const ingredient = state.ingredients.find(item => item.id === newIngredient['_id']);
                if(!ingredient) {
                    state.ingredients.push({
                        id: newIngredient['_id'],
                        type: newIngredient.type,
                        price: newIngredient.price,
                        count: 1
                    });
                } else {
                    ingredient.count++;
                }
            }
        },
        dropIngredient(state, action) {
            const ingredient = state.ingredients.find(item => item.id === action.payload);
            if(ingredient.type === 'bun') return;
            if(ingredient.count>1) {
                ingredient.count--;
            } else {
                state.ingredients = state.ingredients.filter(item => item.id !== action.payload);
            }
        },
        initPrice(state) {
            let price = 0;
            state.ingredients.map(item => price += (item.price*item.count));
            state.price = price;
        },
        add(state, action) {
            const payload = action.payload;
            switch (payload.type) {
                case CREATE_ORDER: {
                    state.requestLoad = true;
                    state.requestFailed = false;
                    break;
                }
                case CREATE_ORDER_SUCCESS: {
                    state.id = action.payload.order.number;
                    state.name = action.payload.order.name;
                    state.requestLoad = false;
                    break;
                }
                case CREATE_ORDER_FAILED: {
                    state.requestFailed = true;
                    state.requestLoad = false;
                    break;
                }
                default:
                    break;
            }
        }
    },
});

export const { addIngredient, dropIngredient, add, initPrice } = orderSlice.actions;
export default orderSlice.reducer;