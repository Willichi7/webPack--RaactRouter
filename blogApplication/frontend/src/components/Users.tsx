import React from 'react'
import { Link, useMatch, useParams } from 'react-router-dom'
import { Container, Paper, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'


const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  borderWidth: 1,
  marginBottom: 5,
  textDecoration: 'none'
}

export const User = ({users}) => {
  const id= useParams().id
  const match = useMatch('/users/:id')
  const user = match ? users.find(user => user.id === id) : null
  if (!user) {
    return null
  }

  return (
    <Container>
      <h2>{user.username}</h2>
      <h3>Added blogs</h3>
      <TableContainer component={Paper}>
      <TableBody>
        {user.blogs.map((blog) => (
        <TableRow key={blog.id}>
          <TableCell>
          <Link to={`/blogs/${blog.id}`} style={blogStyle}>
            {blog.title}
          </Link>
          </TableCell>
        </TableRow>
        ))}
      </TableBody>
      </TableContainer>
    </Container>
  )
}


const Users = ({users}) => {
 
  return (
    <Container>
      <h2>User</h2>
      <TableContainer component={Paper}>
      <thead>
        <tr>
        <th>Username</th>
        <th>Blogs Created</th>
        </tr>
      </thead>
      <TableBody>
        {[...users].map((user) => (
        <TableRow key={user.id} >
          <TableCell >
          <Link to={`/users/${user.id}`}>
            {user.username}
          </Link>
          </TableCell>
          <TableCell>{user.blogs.length}</TableCell>
        </TableRow>
        ))}
      </TableBody>
      </TableContainer>
    </Container>
  )
}

export default Users