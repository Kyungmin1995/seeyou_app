import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState = {
  email: '',
  nickname: '',
};

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    // 모든 사용자 정보를 상태에 저장합니다.
    setUser(state, action) {
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
    },
  },
});

export const {setUser} = UserSlice.actions;

export default UserSlice.reducer;
