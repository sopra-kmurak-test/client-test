import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/helpers/user";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
