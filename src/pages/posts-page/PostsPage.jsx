import './posts-page.css';
import React, { useEffect,useState } from 'react'
import PostList from './../../components/header/posts/PostList';
import Sidebar from './../../components/Sidebar/Sidebar';
import Pagination from '../../components/pagination/Pagination';
import { useSelector,useDispatch } from 'react-redux';
import { fetchPosts,getPostsCount } from '../../Redux/apiCalls/postApiCall';

const POST_PER_PAGE = 3; 
const PostsPage = () => {
    const {categories} = useSelector(state => state.category);
    const [currentPage,setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const {postsCount,posts} = useSelector(state=>state.post);
    const pages = Math.ceil(postsCount/POST_PER_PAGE);
    useEffect(() => {
        dispatch(fetchPosts(currentPage))
        window.scrollTo(0,0);
    },[currentPage]);

    useEffect(() => {
        dispatch(getPostsCount()); 
    },[]);

    return (
        <>
            <section className='posts-page'>
                <PostList posts={posts}/>
                <Sidebar/>
            </section>
            <Pagination pages = {pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </>
    );
}

export default PostsPage;
