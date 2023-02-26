import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    current: 'all',
    categories: [
        { id: 'bun', name: 'Булки', active: false },
        { id: 'sauce', name: 'Соусы', active: false },
        { id: 'main', name: 'Начинки', active: false }
    ],
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCurrent(state, action) {
            state.categories.map(category => {
                category.active = false;
                return category;
            });
            state.current = action.payload;
        },
        setActive(state, action) {
            state.categories.map((category, index) => {
                if(index === action.payload) {
                    category.active = true;
                } else {
                    category.active = false;
                }
                return category;
            });
        },
        setCategories(state, action) {
            state.current = action.payload;
        }
    },
});

export const { setCurrent, setActive, setCategories } = categorySlice.actions;
export default categorySlice.reducer;