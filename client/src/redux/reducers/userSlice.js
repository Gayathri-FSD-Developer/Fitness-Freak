import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      // user & token comes as a server res
      state.currentUser = action.payload.user;
      // console.log(state.currentUser,"state value");
      localStorage.setItem("fitfreak-app-token", action.payload.token);
    },
    logout: (state) => {
      // console.log("logout came");
      state.currentUser = null;
      localStorage.removeItem("fitfreak-app-token");
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;

export default userSlice.reducer;
