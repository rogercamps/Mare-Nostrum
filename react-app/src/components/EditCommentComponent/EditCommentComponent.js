import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {addComment} from '../../store/comments'

function EditCommentComponent({commentContent, user_id, post_id}) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState(commentContent)

  const handleEditComment = (e) => {
    e.preventDefault()
    const newComment = {
      'comment': comment,
      'user_id': user_id,
      'post_id': +post_id
    }
    console.log('new comment ........', newComment);
    dispatch(addComment(newComment))
    setComment('')
  }

  return (
    <div>
      <form onSubmit={ handleEditComment } >
        <textarea className="comment-textarea" value={comment} onChange={(e)=> setComment(e.target.value)}
        />
        <button type="submit" className="">Submit</button>
      </form>
    </div>
  )
}


export default EditCommentComponent;
