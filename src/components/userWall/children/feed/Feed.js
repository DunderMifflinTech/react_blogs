import React from 'react'
import Post from './Post/Post'
import Comment from './Comment/Comment'

function Feed() {
  return (
    <>
    <Post children = {<Comment/>}/>
    </>
  )
}

export default Feed