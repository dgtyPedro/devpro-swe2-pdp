import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from '../app/store';
import {User} from "../services/types/User.ts";
import {Permission} from "../services/types/Permission.ts";

interface AuthState {
    user: User | null;
    token: string | null;
    permission: Permission | null;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token') || null,
    permission: JSON.parse(localStorage.getItem('permission') || 'null'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const {user, token} = action.payload;
            state.user = user;
            state.token = token;
            state.permission = user.role.permission;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.permission = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('permission');
        },
    },
});

export const {setCredentials, logout} = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
