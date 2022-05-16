import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getPosts } from '../../store/posts';
import './PostComponent.css'

function PostComponent() {
  const dispatch = useDispatch();
  const photo_id = useParams();
  const [users, setUsers] = useState([]);
  const sessionUser = useSelector(state => state.session.user);
  const posts = useSelector(state => Object.values(state.posts))
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  return (
    <>
      <ul className="post-feed-ul">
        <div className="feed-container">
          {posts?.map(post => (
            <Link to={`/post/${post?.id}`} key={post.id}>
              <li className='post-feed' >
                <img src={post?.photo_url} alt='' className="post-feed-img"/>
                <p>{post?.caption}</p>
              </li>
            </Link>
          ))}
        </div>
      </ul>
    </>
  )
}


export default PostComponent;
