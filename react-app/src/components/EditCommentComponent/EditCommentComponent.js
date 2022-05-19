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


  useEffect(() => {
    const errors = [];
    if (comment.length > 500) errors.push('Comment should be 500 characters or less');
    if (comment.length < 1) errors.push("Comment must be at least 1 character long");
    setValidationErrors(errors)
  }, [comment]);

  const handleEditComment = async (e) => {
    e.preventDefault()
    // setHasSubmitted(true)
    if (validationErrors.length > 0) {
      return
    }
    const updatedComment = { ...updateComment, comment }
    // if (editComment.length > 0) {
    await dispatch(editComment(updatedComment))
    // const commentEditForm = document.getElementById(`commentForm-${commentId}`)
    setComment('')

  }

  // <div className="error-div">
  // {hasSubmitted && errors.map((error, idx) => (
  //   <li key={idx}>{error}</li>
  // ))}
  // </div>

  return (
    <div className="update-comment">
      <form onSubmit={handleEditComment} >
        {hasSubmitted && validationErrors.length > 0 && (
          <div>
            <ul>
              {validationErrors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
          </div>
        )}
        <textarea className="comment-edit-textarea" value={comment} onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" className="">update comment</button>
      </form>
    </div>
  )
}


export default EditCommentComponent;
