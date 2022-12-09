import {configureStore} from '@reduxjs/toolkit';

import sampleReducer from 'util/reducer/sampleReducer';

export default configureStore({
  reducer: {
    sample: sampleReducer,
  },
});
