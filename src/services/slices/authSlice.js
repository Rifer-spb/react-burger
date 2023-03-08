import { createSlice } from '@reduxjs/toolkit';
import {
    AUTH_REQUEST_LOAD,
    AUTH_REQUEST_SUCCESS,
    AUTH_REQUEST_FAILED
} from '../actions/constants';

const initialState = {
    user: null,
    request: {
        load: false,
        failed: false,
        message: ''
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loadUser(state, action) {
            const payload = action.payload;
            switch (payload.type) {
                case AUTH_REQUEST_LOAD: {
                    state.request.load = true;
                    state.request.failed = false;
                    state.request.message = '';
                    break;
                }
                case AUTH_REQUEST_SUCCESS: {
                    state.user = payload.user;
                    state.request.load = false;
                    break;
                }
                case AUTH_REQUEST_FAILED: {
                    state.request.load = false;
                    state.request.failed = true;
                    state.request.message = payload.message;
                    break;
                }
                default:
                    break;
            }
        },
        clearUser(state) {
            state.user = null;
        },
        setRequest(state, action) {
            const payload = action.payload;
            switch (payload.type) {
                case AUTH_REQUEST_LOAD: {
                    state.request.load = true;
                    state.request.failed = false;
                    state.request.message = '';
                    break;
                }
                case AUTH_REQUEST_SUCCESS: {
                    state.request.load = false;
                    break;
                }
                case AUTH_REQUEST_FAILED: {
                    state.request.load = false;
                    state.request.failed = true;
                    state.request.message = payload.message;
                    break;
                }
                default:
                    break;
            }
        }
    },
});

export const { loadUser, clearUser, setRequest } = authSlice.actions;
export default authSlice.reducer;