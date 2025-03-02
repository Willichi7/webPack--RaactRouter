import React from 'react'
import { useDispatch } from 'react-redux'
import { handleComment } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import { Button, TextField } from '@mui/material'


const Comment = () => {
   const dispatch = useDispatch()
    const {id} = useParams()
   const handleBlogComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    e.target.comment.value = '';  
    dispatch<any>(handleComment({id, comment}));  
};

  return (
    <div>
      <h2>Comment</h2>
      <form onSubmit={handleBlogComment}>
        <TextField label='comment' name='comment' />
        <Button variant='contained' color='primary' type='submit'>add comment</Button>
      </form>

    </div>
  )
}



export default Comment