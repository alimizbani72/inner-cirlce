import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type InitialStateProps = {
  isMobile: boolean | null;
  deviceType: 'mac' | 'windows';
};

const initialState: InitialStateProps = {
  isMobile: null,
  deviceType: 'windows',
};

export const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    initializeDevice(state, action: PayloadAction<string | null>) {
      if (!action.payload) {
        return;
      }
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        action.payload
      );
      state.isMobile = isMobile;
      state.deviceType = /Mac/i.test(action.payload) ? 'mac' : 'windows';
    },
  },
  selectors: {
    selectDevice: (device) => device.deviceType,
    selectIsMobile: (device) => device.isMobile,
  },
});

export const { initializeDevice } = deviceSlice.actions;
export const { selectDevice, selectIsMobile } = deviceSlice.selectors;
export default deviceSlice.reducer;
