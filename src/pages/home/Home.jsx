import React, { useEffect } from 'react'
import './home.css';
import PostList from '../../components/header/posts/PostList';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../Redux/apiCalls/postApiCall';
import { useSelector } from 'react-redux';
import {fetchCategories} from '../../Redux/apiCalls/categoryApiCalls.js';


const Home = () => {
    const {posts} = useSelector(state=>state.post); 
    const {categories} = useSelector(state=>state.category);
    const {users} = useSelector(state=>state.auth);
    console.log(categories);
    const dispatch = useDispatch();
    useEffect(() =>{
     dispatch(fetchPosts(1));
     dispatch(fetchCategories());
 },[]);
    return (
        <section className='home'>
            <div className='home-hero-header'>
                <div className='home-hero-header-layout'>
                    <h1 className='home-title'>
                        Welcome to  Abdi Abderraouf Blog
                    </h1>
                </div>
            </div>
            <div className='home-latest-posts'>Latest Posts</div>
            <div className='home-container'>
               <PostList posts={posts}/>
                <Sidebar />
            </div>
            <div className='home-see-posts-link'>
                <Link className='home-link' to="/posts">SEE ALL POSTS</Link>
            </div>
        </section>
    );
}

export default Home;
