import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {editComment, deleteComment} from '../../store/comments'

function DeleteCommentComponent({deletedComment}) {
  const dispatch = useDispatch();
  // console.log('----------comment', comment);
  // const [comment, setComment] = useState(commentContent)
  const [commentDelete, setCommentDelte] = useState('');

  const handleDeleteComment = (e) => {
    const commentId = {...deletedComment}
    dispatch(deleteComment(commentId))
}

  return (
    <div>
      <form onSubmit={ handleDeleteComment } >
        <button type="submit" className="">Delete Comment</button>
      </form>
    </div>
  )
}


export default DeleteCommentComponent;
