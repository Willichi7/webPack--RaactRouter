import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs"

const blogSlice = createSlice({
   name: "blogs",
   initialState: [],
   reducers: {
      fetchBlogs: (state, action) => {
         return action.payload;
      },
      appendBlogs: (state, action) => {
         state.push(action.payload);
      },
      updateBlogs: (state, action) => {
         const id = action.payload.id;
         return state.map(blog => 
            blog.id !== id ? blog : action.payload
         );
      },
      removeBlogs: (state, action) => {
         return state.filter(blog => blog.id !== action.payload);
      },
   }
});

export const {fetchBlogs, appendBlogs, updateBlogs, removeBlogs, setComments} = blogSlice.actions;

export const initializeBlogs = () => {
   return async dispatch => {
      const blogs = await blogService.getAll();
      dispatch(fetchBlogs(blogs));
   }
}

export const addBlogs = (newObject) => {
   return async dispatch => {
      const newBlog = await blogService.create(newObject);
      dispatch(appendBlogs(newBlog));
   }
}

export const handleLikeClick = (id) => {
   return async dispatch => {
      const blogs = await blogService.getAll();
      const blogToLike = blogs.find(blog => blog.id === id);
      const newLikes = {
         ...blogToLike,
         likes: blogToLike.likes + 1,
         user: blogToLike.user.id
      };
      const updateLikes = await blogService.update(id, newLikes);
      dispatch(updateBlogs(updateLikes));
   };
}

export const handleRemove = (id) => {
   return async dispatch => {
      const blogs = await blogService.getAll();
      const blogToRemove = blogs.find(blog => blog.id === id);
      await blogService.doDelete(id);
      dispatch(removeBlogs(blogToRemove));
   };
}
export const handleComment = ({id, comment}) => {
   return async dispatch => {  
      const blogs = await blogService.getAll();
      console.log(blogs);
      const blogToComment = blogs.find(blog => blog.id === id);
      if (!blogToComment) {
         console.error("Blog not found");
         return;
       }
 
      const newComment = {
         comments: [ comment]
      };
      const updateComment = await blogService.comment(id, newComment);
      dispatch(updateBlogs(updateComment));
   };
};

export default blogSlice.reducer;