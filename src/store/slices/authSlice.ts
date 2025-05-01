import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@/types";
import { User } from "@supabase/supabase-js";

const initialState: AuthState = {
    user: null,
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload,
            state.isLoggedIn = !!action.payload
        },
        logout(state, action: PayloadAction<User | null>) {
            state.user = null,
            state.isLoggedIn = false
        }
    }
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer