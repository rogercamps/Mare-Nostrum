import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getPosts, deletePost } from '../../store/posts';
import './PostDetailComponent.css'
import UpdatePostForm from '../EditCaptionComponent/EditCaptionComponent'
import CommentsComponent from '../CommentsComponent/CommentsComponent'
import AddCommentComponent from '../AddCommentComponent/AddCommentComponent'

function PostDetailComponent({post, hideModal}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  // const history = useHistory();
  // const { postId } = useParams();
  // const post = useSelector(state => state.posts[postId])

  const handleDelete = (e, postId) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deletePost(postId))
      // .then(() => {
      //   history.push('/feed');
      // })
  }

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])


  return (
    <>
      <div className="detail-container">
        <div className="detail-nested-container">
          {
            <>
              <div className="post-detail-div">
                <img src={post?.photo_url} className="post-detail-image post-in-feed" alt='' />
                <div>{post?.user_name.username}</div>
                <div>{post?.caption}</div>
                {sessionUser?.id === post?.user_name.id && (
                  <>
                    <UpdatePostForm post={post} />
                    <button onClick={(e) => handleDelete(e, post.id)} className="detail-delete-button">Delete post</button>
                  </>
                )}
              </div>
            </>
          }
          <div className="post-detail-details">
            <CommentsComponent className="post-detail-div" postId={post.id} />
          </div>
          {/* <AddCommentComponent user_id={sessionUser.id} post_id={postId} /> */}
        </div>
      </div>
    </>
  )
}

export default PostDetailComponent;
