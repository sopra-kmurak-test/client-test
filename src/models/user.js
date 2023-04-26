import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    username: "",
    realName: "",
  },
  reducers: {
    handleLogin: (state, action) => {
      state.username = action.payload.username
    },
    handleLogout: (state) => {
      state.username = ''
    }
  },
});

export const { handleLogin, handleLogout } = userSlice.actions;
export default userSlice.reducer;
