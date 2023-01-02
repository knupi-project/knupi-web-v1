import { createSlice } from '@reduxjs/toolkit';

const pianoSlice = createSlice({
  name: 'piano',
  initialState: {
    pianoInfo: null,
  },
  reducers: {
    updatePianoList: (state, action) => {
      state.pianoInfo = { pianoList: [...action.payload] };
    },
  },
});

export { pianoSlice };
export const { updatePianoList } = pianoSlice.actions;

export default pianoSlice.reducer;
