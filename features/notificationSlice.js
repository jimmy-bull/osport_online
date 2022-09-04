import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "Notification",
  initialState: {
    countNotification: 0,
    __last_Id_for_teammember_value: 0,
  },
  reducers: {
    _notification: (state, action) => {
      state.countNotification = action.payload;
    },
    __last_Id_for_teammember: (state, action) => {
      state.__last_Id_for_teammember_value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { _notification, __last_Id_for_teammember } =
  notificationSlice.actions;

export default notificationSlice.reducer;
