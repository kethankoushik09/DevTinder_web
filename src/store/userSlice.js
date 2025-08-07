import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:"user",
    initialState :null,
    reducers:{
        addUser :  (state,action) =>{
            console.log("Redux user updated:", action.payload);
            return action.payload;
        },

        removeUser :() =>{
            return null;
        }
    }
})


const userReducer = userSlice.reducer;
export const {addUser, removeUser} = userSlice.actions;


export default userReducer;