import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    email: string | null;
    password: string | null;
}

const initialAuthState: AuthState = {
    email: null,
    password: null,
};

const loginSlice = createSlice({
    name: 'login',
    initialState: initialAuthState,
    reducers: {
        setAuthCredentials: (state, action: PayloadAction<{ email: string; password: string }>) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        clearAuthCredentials: (state) => {
            state.email = null;
            state.password = null;
        },
    },
});

export const { setAuthCredentials, clearAuthCredentials } = loginSlice.actions;

export default loginSlice.reducer;
