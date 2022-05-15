import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getComments } from '../../store/comments';
import './CommentsComponent.css'

function CommentsComponent() {
  const dispatch = useDispatch();
  const comment_id = useParams();
  const [users, setUsers] = useState([]);
  const sessionUser = useSelector(state => state.session.user);
  const post = useSelector(state => Object.values(state.posts))
  const comments = useSelector(state => Object.values(state.comments))

  useEffect(() => {
    dispatch(getComments())
  }, [dispatch])

  return (
    <>
      <h1>Comments</h1>
      <ul>
        <div className="feed-container">
          {comments?.map(comment => (
            <Link to={`/post/${post?.id}`} key={comment.id}>
              <li className='post-feed' >
                <img src={post?.photo_url} alt='' className='post-in-feed' />
                <p>{post?.caption}</p>
              </li>
            </Link>
          ))}
        </div>
      </ul>
    </>
  )
}


export default CommentsComponent;
