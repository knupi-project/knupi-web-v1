import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
    isSignUpSuccess: false,
    authErrorMsg: null,
    userInfo: null,
  },
  reducers: {
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
      console.log('setLogout 실행', state.isLoggedIn);
      console.log('userInfo : ', state.userInfo);
    },
    setLogIn: (state, action) => {
      state.isLoggedIn = true;
      console.log('setLogIn 실행', state.isLoggedIn);
      console.log('userInfo : ', state.userInfo);
    },
    setAuthErrorMsg: (state, action) => {
      state.authErrorMsg = action.payload;
      console.log('setAuthErrorMsg 실행', state.authErrorMsg);
    },
    setIsSignUpSuccess: (state, action) => {
      state.isSignUpSuccess = action.payload;
    },
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
      console.log(state.userInfo);
    },
  },
});

export { loginSlice };
// Action creators are generated for each case reducer function
export const {
  setLogIn,
  setLogout,
  setAuthErrorMsg,
  setIsSignUpSuccess,
  updateUserInfo,
} = loginSlice.actions;

export default loginSlice.reducer;
