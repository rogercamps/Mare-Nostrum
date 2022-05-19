import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editComment } from '../../store/comments'
import './EditCommentComponent.css';

function EditCommentComponent({ updateComment }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('')
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);


  const handleEditComment = async (e) => {
    e.preventDefault()
    // setHasSubmitted(true)
    if (validationErrors.length > 0) {
      return
    }
    const updatedComment = { ...updateComment, comment }
    await dispatch(editComment(updatedComment))
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
    <div className="update-comment">
      <form onSubmit={handleEditComment} >
      {errors?.length > 0 && errors?.map((error, ind) => (
        <div className="errors" key={ind}>{error}</div>
      ))}
        <textarea className="comment-edit-textarea" value={comment} onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" className="">update comment</button>
      </form>
    </div>
  )
}


export default EditCommentComponent;
