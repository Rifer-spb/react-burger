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
    bun: null,
    ingredients: [],
    view: false,
    requestLoad: false,
    requestFailed: false
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addItem(state, action) {
            const newIngredient = action.payload;
            if(newIngredient.type === 'bun') {
                state.bun = newIngredient;
            } else {
                state.ingredients.push(newIngredient);
            }
            if(state.bun) {
                orderSlice.caseReducers.updatePrice(state);
            }
        },
        dropItem(state, action) {
            state.ingredients = state.ingredients.filter(
                (item,index) => index !== action.payload.index
            );
            if(state.bun) {
                orderSlice.caseReducers.updatePrice(state);
            }
        },
        updatePrice(state) {
            let price = 0;
            state.ingredients.map(item => price += item.price);
            price += state.bun.price*2;
            state.price = price;
        },
        sortItems(state, action) {
            const ingredient = state.ingredients.find(
                (item,index) => index === action.payload.fromIndex
            );
            state.ingredients = state.ingredients.filter(
                (item,index) => index !== action.payload.fromIndex);

            state.ingredients.splice(action.payload.toIndex, 0, ingredient);
        },
        //Не смог переименовать в createOrder, так как в action addOrder и createOrder уже забиндены
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

export const { add } = orderSlice.actions;
export default orderSlice.reducer;