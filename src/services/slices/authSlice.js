import { createSlice } from '@reduxjs/toolkit';
import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_ERROR
} from '../actions/constants';

const initialState = {
    user: null,
    requestLoad: false,
    requestFailed: false,
    requestFailedText: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loadUser(state, action) {
            const payload = action.payload;
            switch (payload.type) {
                case AUTH_REQUEST: {
                    state.requestLoad = true;
                    state.requestFailed = false;
                    state.requestFailedText = false;
                    break;
                }
                case AUTH_SUCCESS: {
                    state.user = payload.user;
                    state.requestLoad = false;
                    break;
                }
                case AUTH_ERROR: {
                    state.requestFailed = true;
                    state.requestFailedText = payload.message;
                    state.requestLoad = false;
                    break;
                }
                default:
                    break;
            }
        },
        clearUser(state) {
            state.user = null;
        }
    },
});

export const { loadUser, clearUser } = authSlice.actions;
export default authSlice.reducer;