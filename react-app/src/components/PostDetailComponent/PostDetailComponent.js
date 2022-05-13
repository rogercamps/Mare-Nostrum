import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getPosts } from '../../store/posts';
import './PostDetailComponent.css'

function PostDetailComponent() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const sessionUser = useSelector(state => state.session.user);

  const { postId } = useParams();
  const post = useSelector(state => state.posts[postId])

  console.log('-----user name', post);
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  return (
    <>
      <h1>Post detail</h1>
      <ul>
        <div className="feed-container">
          {
            <>
              <div>
                <img src={post?.photo_url} alt='' className='post-in-feed' />
                <p>{post?.user_name.username}</p>
                <p>{post?.caption}</p>
              </div>
            </>
          }
        </div>
      </ul>
    </>
  )
}

export default PostDetailComponent;
