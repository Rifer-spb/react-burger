import { createSlice } from '@reduxjs/toolkit';
import {
    LOAD_INGREDIENTS,
    LOAD_INGREDIENTS_FAILED,
    LOAD_INGREDIENTS_SUCCESS
} from '../actions/constants';

const initialState = {
    ingredients: [],
    current: null,
    requestLoad: false,
    requestFailed: false
};

const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState,
    reducers: {
        loadItems(state, action) {
            const payload = action.payload;
            switch (payload.type) {
                case LOAD_INGREDIENTS: {
                    state.requestLoad = true;
                    state.requestFailed = false;
                    break;
                }
                case LOAD_INGREDIENTS_SUCCESS: {
                    state.ingredients = payload.ingredients;
                    state.requestLoad = false;
                    break;
                }
                case LOAD_INGREDIENTS_FAILED: {
                    state.requestFailed = true;
                    state.requestLoad = false;
                    break;
                }
            }
        },
        setCurrent(state, action) {
            state.current = action.payload
        }
    },
});

export const { loadItems, setCurrent } = ingredientSlice.actions;
export default ingredientSlice.reducer;