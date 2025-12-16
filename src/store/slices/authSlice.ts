import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState } from "@/types";
import { User } from "@supabase/supabase-js";
import axios, { AxiosError } from "axios";

const initialState: AuthState = {
    user: null,
    isLoggedIn: false
}

export const loginUser = createAsyncThunk(
    'auth/login', 
    async ({ email }: { email: string}, { rejectWithValue }) => {
        try{
            await axios.post('/api/auth/login', { email })
        }  
        catch(error){
            if(error instanceof AxiosError){
                return rejectWithValue(error.response?.data || "Something went wrong")
            }
        }      
    }
)

export const verifyLoginLink = createAsyncThunk(
    'auth/verify',
    async ({ code }: { code: string },{ rejectWithValue }) => {
        try{
            await axios.post('/api/auth/callback', { code })
        }
        catch(error){
            if(error instanceof AxiosError){
                return rejectWithValue(error.response?.data || "Something went wrong")
            }
        }
    }
)

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
    },
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer