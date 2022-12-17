import { configureStore } from '@reduxjs/toolkit';
import loginSlice from 'util/reducer/loginSlice';

export default configureStore({
  reducer: {
    login: loginSlice,
  },
});
