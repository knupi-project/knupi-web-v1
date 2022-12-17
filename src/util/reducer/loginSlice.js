import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    updateLoginState: (state, action) => {
      state.isLoggedIn = action.payload;
    },

    setLogout: (state) => {
      state.isLoggedIn = false;
      console.log(state.isLoggedIn);
    },

    setLogIn: (state) => {
      state.isLoggedIn = true;
      console.log(state.isLoggedIn);
    },
  },
});

export { loginSlice };
// Action creators are generated for each case reducer function
export const { updateLoginState, setLogIn, setLogout } = loginSlice.actions;

export default loginSlice.reducer;
