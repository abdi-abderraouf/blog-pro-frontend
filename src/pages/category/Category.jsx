import React, { useEffect } from 'react'
import './category.css';
import { useParams,Link } from 'react-router-dom';
import PostList from '../../components/header/posts/PostList';
import { useSelector,useDispatch } from 'react-redux';
import { fetchPostsCategory } from '../../Redux/apiCalls/postApiCall';


const Category = () => {
    const dispatch = useDispatch();
    const {category} = useParams();
    const {postsCat} = useSelector(state=>state.post);
    console.log('postsCat',postsCat);
    useEffect(()=> {
       dispatch(fetchPostsCategory(category));
       window.scrollTo(0,0);
    },[category]); 
    
    return (
        <div className='category'> 
          {postsCat.length === 0 ? <>
            <h1 className='category-NotFound'> Posts based on <span>{category}</span> Not Found</h1> 
            <Link to="/posts" className='category-NotFoundLink' > goto Posts page</Link>   
          </> 
           : <>
           <h1 className='category-title'>Posts based on {category}</h1>
             <section className='align'>
               <PostList posts={postsCat}/>
               </section>
           </>}
             
        </div>

        
    )
}

export default Category;
