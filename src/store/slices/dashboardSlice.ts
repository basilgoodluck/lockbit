import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DashboardState } from "@/types";
import axios from "axios";

const initialState: DashboardState = {
    media: {
        videos_len: 0,
        images_len: 0,
        audios_len: 0,
        documents_len: 0,
        others_len: 0,
    },

    recent_activities: [
        {
            activity_type: '',
            file_name: '',
            date: '',
            status: '',
        }       
    ]
}

const fetchMediaCounts = createAsyncThunk('dashboard/fetchMediaCounts', async () => {
    const response = await axios.get('/api/storage/counts');
    return response.data
})

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setMedia(state, action: PayloadAction<DashboardState['media']>){
            state.media = action.payload
        },
        setRecentActivities(state, action: PayloadAction<DashboardState['recent_activities']>){
            state.recent_activities = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMediaCounts.fulfilled, (state, action) =>{
            state.media = action.payload
        })
    }
})

export const { setMedia, setRecentActivities } = dashboardSlice.actions
export default dashboardSlice.reducer