import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { feedReducer } from "./feedSlice";
import { requestreducer } from "./requestSlice";
import { connectionreducer } from "./connectionSlice";

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