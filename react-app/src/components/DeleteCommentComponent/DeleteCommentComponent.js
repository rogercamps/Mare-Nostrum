import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {editComment, deleteComment} from '../../store/comments'
import './DeleteCommentComponent.css'

function DeleteCommentComponent({deletedComment}) {
  const dispatch = useDispatch();
  const [commentDelete, setCommentDelte] = useState('');

  const handleDeleteComment = (e) => {
    const commentId = {...deletedComment}
    dispatch(deleteComment(commentId))
}

  return (
    <div className="delete-comment">
      <form onSubmit={ handleDeleteComment } >
        <button type="submit" className="delete-comment-button">Delete Comment</button>
      </form>
    </div>
  )
}


export default DeleteCommentComponent;
