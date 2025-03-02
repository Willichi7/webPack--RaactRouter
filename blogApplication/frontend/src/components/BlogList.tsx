import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useMatch, useNavigate, useParams } from 'react-router-dom'
import { handleLikeClick, handleRemove } from '../reducers/blogReducer'
import { notificationType, setNotification } from '../reducers/notificationReducer'
import Comment from './Comment'
import { Button, Container } from '@mui/material'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
  marginTop: 5,
  textDecoration: 'none'
}

export const Blog = ({ blogs}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const match = useMatch('/blogs/:id')
  const id = useParams().id
  const blog = match ? blogs.find(blog => blog.id === id) : null
  if (!blog) {
    return null
  }

  const handleLike = () => {
    dispatch<any>(handleLikeClick(blog.id));
    dispatch<any>(setNotification(`${blog.title} has been liked by a user`, 5000));
    dispatch<any>(notificationType('success'));
  };

  const handleDelete = () => {
    dispatch<any>(handleRemove(blog.id));
    dispatch<any>(setNotification(`${blog.title} has been deleted`, 5000));
    dispatch<any>(notificationType('success'));
    
    navigate('/blogs')
  };

  return (
    <div>
      <Container>
        <h2>{blog.title}</h2>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button onClick={handleLike}>like</button></p>
        <p>added by {blog.author}</p>
        {blog?.user.name === blog.author && (
          <Button variant='contained' color='primary' onClick={handleDelete}>delete</Button>
        )}
        <Comment />
        <ul>
          {blog?.comments?.map((comment, index) => <li key={index}>{comment}</li>)}
        </ul>
      </Container>
    </div>
  )
}

const BlogList = ({ blogs, currentUser }) => {
  return (
    <Container>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Container key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div>
                <h3>{blog.title}</h3>
              </div>
            </Link>
          </Container>
        ))
      }
    </Container>
  )
}

export default BlogList