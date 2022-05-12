import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getPosts } from '../../store/posts';
import './PostComponent.css'

function PostComponent() {
  const dispatch = useDispatch();
  const photo_id = useParams();
  const [users, setUsers] = useState([]);
  const sessionUser = useSelector(state => state.session.user);
  const posts = useSelector(state => Object.values(state.posts))
  console.log('==========posts', posts);
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  return (
    <>
      <h1>Feed</h1>
      <ul>
        <div className="feed-container">
          {posts?.map(post => (
            <li className='post-feed' key={post?.id}>
              <img src={post?.photo_url} alt='' className='post-in-feed' />
              <p>{post?.caption}</p>
            </li>
          ))}
        </div>
      </ul>
    </>
  )
}


export default PostComponent;



  // const posts = useSelector(state => Object.values(state.posts))
