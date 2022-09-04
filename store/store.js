import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from '../features/counterSlice'
// import counterReducer_2 from '../features/second'
import loginReducer from "../features/loginSlice";
import addTeamModalSlice from "../features/addTeamModalSlice";
import notificationSlice from "../features/notificationSlice";

export default configureStore({
  reducer: {
    // counter: counterReducer,
    // counter_2: counterReducer_2,
    login: loginReducer,
    openModalTeam_1: addTeamModalSlice,
    _notification: notificationSlice,
  },
});
