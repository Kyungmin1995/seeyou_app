import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState = {
  navigation: 'Home',
};

export const NavigationSlice = createSlice({
  name: 'Navigation',
  initialState,
  reducers: {
    // 모든 사용자 정보를 상태에 저장합니다.
    setNavigation(state, action) {
      state.navigation = action.payload.navigation;
    },
  },
});

export const {setNavigation} = NavigationSlice.actions;

export default NavigationSlice.reducer;
