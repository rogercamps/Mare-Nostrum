import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getPosts, deletePost } from '../../store/posts';
import './PostDetailComponent.css'
import UpdatePostForm from '../EditCaptionComponent/EditCaptionComponent'

function PostDetailComponent() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const { postId } = useParams();
  const post = useSelector(state => state.posts[postId])

  const handleDelete = (postId) => {
    dispatch(deletePost(postId))
      .then(() => {
        history.push('/feed');
      })
  }

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  return (
    <>
      <h1>Post detail</h1>
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
      <div>
        {sessionUser?.id === post?.user_name.id && (
          <>
            <UpdatePostForm post={post} />
            <button onClick={() => handleDelete(postId)}>Delete post</button>
          </>
        )}
      </div>
    </>
  )
}

export default PostDetailComponent;
