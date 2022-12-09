import {createSlice} from '@reduxjs/toolkit';

const sampleSlice = createSlice({
  name: 'sample',
  initialState: {
    connectionStatus: 0,
    receivedDataList: [],
  },
  reducers: {
    updateWebSocketConnection: (state, action) => {
      state.connectionStatus = action.payload;
      console.log(action.type);
    },

    updateReceivedDataList: (state, action) => {
      state.receivedDataList = [...state.receivedDataList, action.payload];
      console.log(action.type);
    },
  },
});

export {sampleSlice};
// Action creators are generated for each case reducer function
export const {updateWebSocketConnection, updateReceivedDataList} =
  sampleSlice.actions;

export default sampleSlice.reducer;
