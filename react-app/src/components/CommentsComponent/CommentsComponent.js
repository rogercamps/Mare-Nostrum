import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getComments } from '../../store/comments';
import './CommentsComponent.css'
import EditCommentComponent from '../EditCommentComponent/EditCommentComponent'

function CommentsComponent({ postId }) {
  const dispatch = useDispatch();
  const comments = useSelector(state => Object.values(state.comments));
  const [comment, setComment] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    dispatch(getComments(postId))
  }, [dispatch, postId])


  return (
    <>
      <h1>Comments</h1>
      <div className="comment-container">
        {comments.map(comment =>
          <div key={comment?.id} className="comment-index-div">
            <span>{comment?.user_name.username}: </span>
            <div className="comment-body">
              {comment?.comment}
            </div>
            <EditCommentComponent updateComment={comment} />
          </div>
        )}
      </div>
    </>
  )
}

export default CommentsComponent;


// <div className="comment-container">
// <div className="comment-container">
// {comments.filter(comment => comment.post_id === postId).map(comment =>
//   <div key={comment?.id} className="comment-index-div">
//     <span>{comment?.User.username}: </span>
//     <div className="comment-body">
//       {comment?.comment}
//     </div>
//   </div>
// )}
// </div>
