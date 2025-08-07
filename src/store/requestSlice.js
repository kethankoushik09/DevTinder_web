import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:"requests",
    initialState : null,
    reducers:{
        addrequestsdata : (state,action)=>{
            return action.payload;
        },

        removerequestsdata : (state,action)=>{
            const newdata = state.filter((itm) => itm._id !== action.payload);
            return newdata;
        },

        cleardata : ()=> null
    }

})

export const requestreducer = requestSlice.reducer;

export const {addrequestsdata, removerequestsdata ,cleardata} = requestSlice.actions;
