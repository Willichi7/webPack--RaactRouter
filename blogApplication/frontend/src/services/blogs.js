import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = newToken => {
   token =  `Bearer ${newToken}`
}
const getAll = async () => {
   const response = await axios.get(baseUrl)
   return response.data
}


const create = async (newBlogs) => {
   const config = {
      headers: { Authorization: token },
   };
   const response = await axios.post(baseUrl, newBlogs, config);
   return response.data
};

const update = async (id, likes) => {
   const response =  await axios.put(`${baseUrl}/${id}`, likes)
   return response.data
}

const doDelete = async (id) => {
   const config = {
      headers : {Authorization: token}
   }
   return await axios.delete(`${baseUrl}/${id}`, config)
}

const comment = async (id, comment) => {
   const response =  await axios.post(`${baseUrl}/${id}/comments`, comment)
   return response.data
}

export default {
   getAll, create, update, setToken, doDelete, comment
}