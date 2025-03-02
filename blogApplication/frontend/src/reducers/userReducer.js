import { createSlice } from "@reduxjs/toolkit";
import userService from '../services/users'

const userSlice = createSlice({
   name: "users",
   initialState: [],
   reducers: {
      getUsers: (state, action) => {
         return action.payload;
      },
   },
});

export const { getUsers } = userSlice.actions;

export const initializeUser = () => {
   return async dispatch => {
      const users = await userService.users()
      dispatch(getUsers(users))
   }
}

export default userSlice.reducer;