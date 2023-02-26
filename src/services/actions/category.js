import { setCurrent, setActive, setCategories } from '../slices/categorySlice';

export function updateCurrent(type) {
    return function (dispatch) {
        dispatch(setCurrent(type));
    }
}

export function updateActive(index) {
    return function (dispatch) {
        dispatch(setActive(index));
    }
}

export function updateCategory(type) {
    return function (dispatch) {
        dispatch(setCategories(type));
    }
}