import React from 'react'
import { useDispatch } from 'react-redux'
import { addBlogs } from '../reducers/blogReducer'
import { notificationType, setNotification } from '../reducers/notificationReducer'
import { Button, TextField } from '@mui/material'

const BlogForm = () => {
  const dispatch = useDispatch()

  const handleAddBlog = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    dispatch<any>(addBlogs({ title, author, url }))
    dispatch<any>(addBlogs({title, url, author}))
    dispatch<any>(setNotification(`Added ${title}`, 5000))
    dispatch<any>(notificationType('success'));
  }

  return (
    <div >
    <h2>Create New</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          <TextField label='title' name='title'  />
        </div>
        <div>
          <TextField label='author'  name='author'  />
        </div>
        <div>
          <TextField label = 'url'  name='url' />
        </div>
        <Button variant='contained' color='primary' type='submit'>Create</Button>
      </form>
    </div>
  )
}

export default BlogForm