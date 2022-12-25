import { configureStore } from '@reduxjs/toolkit';
import loginSlice from 'util/reducer/loginSlice';
import pianoSlice from './pianoSlice';

export default configureStore({
  reducer: {
    login: loginSlice,
    piano: pianoSlice,
  },
});
