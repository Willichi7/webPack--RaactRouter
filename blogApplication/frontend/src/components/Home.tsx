import React from 'react'
import BlogList from './BlogList'

const Home = ({blogs}) => {
  return (
    <div>
      <BlogList blogs={blogs} />
    </div>
  )
}

export default Home