import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
    authErrorMsg: null,
    isSignUpSuccess: false,
  },
  reducers: {
    updateLoginState: (state, action) => {
      state.isLoggedIn = action.payload;
    },

    setLogout: (state) => {
      state.isLoggedIn = false;
    },

    setLogIn: (state) => {
      state.isLoggedIn = true;
    },

    setAuthErrorMsg: (state, action) => {
      state.authErrorMsg = action.payload;
      console.log('setAuthErrorMsg 실행', state.authErrorMsg);
    },

    setIsSignUpSuccess: (state, action) => {
      state.isSignUpSuccess = action.payload;
    },
  },
});

export { loginSlice };
// Action creators are generated for each case reducer function
export const {
  updateLoginState,
  setLogIn,
  setLogout,
  setAuthErrorMsg,
  setIsSignUpSuccess,
} = loginSlice.actions;

export default loginSlice.reducer;
