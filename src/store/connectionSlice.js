import { createSlice } from "@reduxjs/toolkit";


const connectionSlice = createSlice({
    name:"connections",
    initialState:null,
    reducers:{
        addconnectionsData:(state,action)=>{
            return action.payload;
        },
        removeconnectionData:()=>(null)
    }
})
export const connectionreducer = connectionSlice.reducer;

export const {addconnectionsData,removeconnectionData} = connectionSlice.actions;
