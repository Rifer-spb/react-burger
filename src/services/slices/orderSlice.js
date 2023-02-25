import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: null,
    name: null,
    price: null,
    ingredients: [],
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setIngredients(state, action) {
            state.ingredients = action.payload;
        },
        setPrice(state, action) {
            state.price = action.payload;
        },
        setOrder(state, action) {
            state.id = action.payload.id;
            state.name = action.payload.name;
        }
    },
});

export const { setIngredients, setPrice, setOrder } = orderSlice.actions;
export default orderSlice.reducer;