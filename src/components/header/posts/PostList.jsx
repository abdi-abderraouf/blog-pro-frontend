import React from 'react'
import PostItem from './PostItem';
import "./Post.css";


const PostList = ({posts}) => {
    console.log(posts);
    return (
        <div className='post-list'> 
    {posts.map(post=><PostItem post={post} key={post._id}/>) }  
        </div>
    );
}

export default PostList;
