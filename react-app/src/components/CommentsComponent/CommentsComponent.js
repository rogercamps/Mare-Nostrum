import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getComments } from '../../store/comments';
import './CommentsComponent.css';
import EditCommentComponent from '../EditCommentComponent/EditCommentComponent';
import DeleteCommentComponent from '../DeleteCommentComponent/DeleteCommentComponent';
import { deleteComment } from '../../store/comments'
import AddCommentComponent from '../AddCommentComponent/AddCommentComponent'


function CommentsComponent({ postId }) {
  const dispatch = useDispatch();
  const comments = useSelector(state => Object.values(state.comments));
  const [comment, setComment] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    dispatch(getComments(postId))
  }, [dispatch, postId])

  const handleDeleteComment = async (e) => {
    e.preventDefault()
    const commentId = +e.currentTarget.id
    await dispatch(deleteComment(commentId))
  }
  const sessionUser = useSelector(state => state.session.user)
  return (
    <>
      <AddCommentComponent user_id={sessionUser?.id} post_id={postId} />
      <div className="comment-container">
        {comments.map(comment =>
          <div key={comment?.id} className="comment-index-div">
            <span>{comment?.user_name.username}: </span>
            <div className="comment-body">
              {comment?.comment}
            </div>
            <div className="comments-components">
              <EditCommentComponent updateComment={comment} className="update-comment-component" />
              <DeleteCommentComponent deletedComment={comment} className="deleted-comment-component" />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CommentsComponent;

// {sessionUser && sessionUser?.id === comment?.userId && (
//   <button onClick={() => handleDeleteComment(comment?.id)} className='post-detail-comment-delete-btn'>
//     Delete Comment
//   </button>
// )}
