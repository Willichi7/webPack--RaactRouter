import {configureStore} from '@reduxjs/toolkit';
import blogReducer from './reducers/blogReducer'
import filterReducer from './reducers/filterReducer';
import notificationReducer from './reducers/notificationReducer';
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer';



const store  = configureStore({
   reducer: {
      blogs: blogReducer,
      filter: filterReducer,
      notification: notificationReducer,
      login: loginReducer,
      users: userReducer
   }
})

export default store;