import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addComment } from '../../store/comments'
import './AddCommentComponent.css'

function AddCommentComponent({ user_id, post_id }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState([])

  const handleAddComment = (e) => {
    e.preventDefault()
    const newComment = {
      'comment': comment,
      'user_id': user_id,
      'post_id': +post_id
    }

    dispatch(addComment(newComment))
      .then((response) => {
        if (!response.ok) {
          setErrors(response.errors);
        } else {
          setErrors([]);
        }
      })
    setComment('');
  }

  return (
    <div className="add-comment">
      {errors?.length > 0 && errors?.map((error, ind) => (
        <div className="errors" key={ind}>{error}</div>
      ))}
      <form onSubmit={handleAddComment}  ><p>Add Comment:</p>
        <textarea className="comment-textarea" value={comment} onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" className="">Submit</button>
      </form>
    </div>
  )
}



export default AddCommentComponent;
