import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import { feedReducer } from "./feedSlice.js";
import { requestreducer } from "./requestSlice.js";
import { connectionreducer } from "./connectionSlice.js";

const appStore = configureStore({
    reducer:{
        user : userReducer,
        feed: feedReducer,
        request:requestreducer,
        connection : connectionreducer
    },
    devTools:true
})

export default appStore;