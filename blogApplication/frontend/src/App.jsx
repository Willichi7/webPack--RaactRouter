import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer';
import BlogList, { Blog } from './components/BlogList';
import { Routes, Route, Link } from 'react-router-dom' 
import Home from './components/Home';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import { loggedUser, logoutUser } from './reducers/loginReducer';
import Users, { User } from './components/Users';
import { initializeUser } from './reducers/userReducer'
import { Container, AppBar, Toolbar, Button, Typography } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const blogs = useSelector(state => state.blogs)
  const login = useSelector(state => state.login)
  const allUsers = useSelector(state => state.users)
  console.log(allUsers)
  const user = login.user

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);

  useEffect(() => {
    dispatch(loggedUser())
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm />
    </Togglable>
  )

  const Footer = () => {
    return (
      <div>
        <br />
        <em>Blog app for <a href="https://fullstackopen.com/en/">Full Stack Open 2025</a></em>
      </div>
    )
  }

  return (
    <Container>
      {user === null ? loginForm() :
        <div>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" component={Link} to='/blogs'>blogs</Button>
              <Button color="inherit" component={Link} to='/users'>users</Button>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                {user.username} logged-in
              </Typography>
              <Button color="inherit" onClick={handleLogout}>logout</Button>
            </Toolbar>
          </AppBar>
          <h2>blogs</h2>
          <Notification/>
          {blogForm()}
          <Routes>
            <Route path='/' element={<Home blogs={blogs}/>}/>
            <Route path='/blogs/:id' element={<Blog blogs={blogs}/>}/>
            <Route path='/create' element={<BlogForm/>}/>
            <Route path='/users/:id' element={<User users={allUsers}/>}/>
            <Route path='/users' element={<Users users={allUsers}/>}/>
            <Route path='/blogs' element={<BlogList blogs={blogs} />}/>
          </Routes> 
        </div>
      }
      <Footer />
    </Container>
  )
}

export default App
