import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {editComment} from '../../store/comments'

function EditCommentComponent({updateComment}) {
  const dispatch = useDispatch();
  // console.log('----------comment', comment);
  // const [comment, setComment] = useState(commentContent)
  const [comment, setComment] = useState('')
  console.log('update comment >>>>>>>', updateComment);
  // const handleEditComment = (e) => {
  //   e.preventDefault()
  //   const newComment = {
  //     'comment': comment,
  //     'user_id': user_id,
  //     'post_id': +post_id
  //   }

  const handleEditComment = async (e) => {
    e.preventDefault()
    const updatedComment = { ...updateComment, comment }
    console.log('updatedComment-----', updatedComment);
    // if (editComment.length > 0) {
        await dispatch(editComment(updatedComment))
        // const commentEditForm = document.getElementById(`commentForm-${commentId}`)
        setComment('')
        // commentEditForm.style.display = 'none'
    // } else {
    //     alert('comment must not be empty')
    // }
}


  //     dispatch(updateComment(newComment))
  //     setComment('')


  // }

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
