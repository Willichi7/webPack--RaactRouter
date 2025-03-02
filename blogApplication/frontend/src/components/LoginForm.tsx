import React from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../reducers/loginReducer'
import { Button, TextField } from '@mui/material'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    const username = e.target.username.value
    const password = e.target.password.value

    e.target.username.value = ''
    e.target.password.value = ''

    dispatch<any>(addUser({username, password}))

  }
  return (
    <div style={{marginTop: 20, marginBottom: 20}}>   
     <h1><em>Login Form</em></h1>
      <form onSubmit={handleSubmit}>
      <div>
        <TextField label='username' name='username' />
      </div>
      <div>
        <TextField label='password' type='password' name='password'/>
      </div>
      <Button variant='contained' color='primary' type='submit'>login</Button>
      </form>
    </div>
  )
}

export default LoginForm