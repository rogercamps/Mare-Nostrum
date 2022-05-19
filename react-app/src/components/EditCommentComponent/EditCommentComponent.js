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
    setHasSubmitted(true)
    // if (validationErrors.length > 0) {
    //   return
    // }

    const updatedComment = { ...updateComment, comment }
    // console.log('updatedComment', updatedComment);
    const data = await dispatch(editComment(comment, updatedComment.id))
    if (data?.errors) {
      setErrors(data.errors)
    }


    // const updatedComment = { ...updateComment, comment }
    // await dispatch(editComment(updatedComment))
    //   .then((response) => {
    //     if (!response.ok) {
    //       setErrors(response.errors);
    //     } else {
    //       setErrors([]);
    //     }
    //   })
    setComment('');


  }


  // useEffect(() => {
  //   setErrors([]);
  // }, [comment])

  return (
    <div className="update-comment">
      <div className="edit-comment-errors-wrapper">
        <form onSubmit={(e) => handleEditComment(e)} className="edit-comment-form">
          {hasSubmitted && (
            <div className="edit-comment-errors">
              {errors?.length > 0 && errors?.map((error, ind) => (
                <div className="errors" key={ind}>{error}</div>
              ))}
            </div>
          )}
          <textarea className="comment-edit-textarea" value={comment} onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit" className="update-comment-button">update comment</button>
        </form>
      </div>
    </div>
  )
}


export default EditCommentComponent;
