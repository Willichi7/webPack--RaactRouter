import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'
import loginService from '../services/login'

const loginSlice = createSlice({
   name: "login",
   initialState: { 
      user: null 
   },
   reducers: {
      setUser: (state, action) => {
         state.user = action.payload;
      },
      clearUser: (state) => {
         state.user = null;
      },

   },
});


export const { setUser, clearUser } = loginSlice.actions;

export const addUser = (newUser) => {
   return async dispatch => {
      const user = await loginService.login(newUser)
      console.log(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
   }
}

export const loggedUser = () => {
   return dispatch => {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON) {
         const user = JSON.parse(loggedUserJSON)
         dispatch(setUser(user))
         blogService.setToken(user.token)
      }
   }
}

export const logoutUser = () => {
   return dispatch => {
      window.localStorage.removeItem('loggedUser')
      dispatch(clearUser())
      blogService.setToken(null)
   }
}

export default loginSlice.reducer
