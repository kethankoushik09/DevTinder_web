import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name :"feed",
    initialState: null,
    reducers:{
        addFeed : (state,action)=>{
            return action.payload;
        },
        removefeed:(state,action) => {
            const newfeed = state.filter((itm)=> itm._id !== action.payload);
            return newfeed;
        }
    }
})

export const feedReducer = feedSlice.reducer;
export const {addFeed ,removefeed} = feedSlice.actions;