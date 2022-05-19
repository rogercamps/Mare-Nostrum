import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {editComment} from '../../store/comments'

function EditCommentComponent({updateComment}) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('')



  const handleEditComment = async (e) => {
    e.preventDefault()
    const updatedComment = { ...updateComment, comment }
    // if (editComment.length > 0) {
        await dispatch(editComment(updatedComment))
        // const commentEditForm = document.getElementById(`commentForm-${commentId}`)
        setComment('')
        // commentEditForm.style.display = 'none'
    // } else {
    //     alert('comment must not be empty')
    // }
}


  return (
    <div>
      <form onSubmit={ handleEditComment } >
        <textarea className="comment-edit-textarea" value={comment} onChange={(e)=> setComment(e.target.value)}
        />
        <button type="submit" className="">update comment</button>
      </form>
    </div>
  )
}


export default EditCommentComponent;
