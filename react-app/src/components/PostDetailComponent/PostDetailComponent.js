import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getPosts, deletePost } from '../../store/posts';
import './PostDetailComponent.css'
import UpdatePostForm from '../EditCaptionComponent/EditCaptionComponent'
import CommentsComponent from '../CommentsComponent/CommentsComponent'
import AddCommentComponent from '../AddCommentComponent/AddCommentComponent'

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
      <div className="feed-container">
        {
          <>
            <div className="post-detail-div">
              <img src={post?.photo_url} alt='' className='post-in-feed' />
              <div>{post?.user_name.username}</div>
              <div>{post?.caption}</div>
              {sessionUser?.id === post?.user_name.id && (
                <>
                  <UpdatePostForm post={post} />
                  <button onClick={() => handleDelete(postId)}>Delete post</button>
                </>
              )}
            </div>
          </>
        }
      </div>
      <div className="post-detail-details">
        <CommentsComponent postId={postId} />
        {/* <AddCommentComponent user_id={sessionUser.id} post_id={postId} /> */}
      </div>
    </>
  )
}

export default PostDetailComponent;
