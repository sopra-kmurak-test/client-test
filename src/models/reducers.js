import { configureStore } from "@reduxjs/toolkit";
//import userReducer from "models/user";

export default configureStore({
    reducer: {
        user: userReducer,
    },
});
