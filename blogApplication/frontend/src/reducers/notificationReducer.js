import { createSlice } from "@reduxjs/toolkit";


const initialState = {
   notification : '',
   type: ''
}

const notificationSlice = createSlice({
   name: 'notification',
   initialState,
   reducers: {
      showNotification(state, action){
         state.notification = action.payload
      },
      clearNotification(state) {
         state.notification = ''
         state.type = ''
      },
      setType(state, action) {
         state.type = action.payload
      }
   }
})


export const {showNotification, clearNotification, setType} = notificationSlice.actions

export const setNotification = (message, timeout) => {
   return dispatch => {
      dispatch(showNotification(message))
      setTimeout(() => {
         dispatch(clearNotification())
      }, timeout)
   }
}
export const notificationType = (type) => {
   return (dispatch) => {
      dispatch(setType(type));
   };
};

export default notificationSlice.reducer