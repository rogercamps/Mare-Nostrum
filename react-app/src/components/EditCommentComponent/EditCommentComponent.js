import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editComment } from '../../store/comments'
import './EditCommentComponent.css';
import Popup from 'reactjs-popup';
import comment_icon from '../../images/ig_comment.png'

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


  useEffect(() => {
    setErrors([]);
  }, [comment])

  return (
    <div className="update-comment">
      <div className="edit-comment-errors-wrapper">
        <Popup trigger={<img src={comment_icon} alt="edit post" className="edit-comment-icon"/>} modal>
        {close => (
          <div className="modal">
            <div className="content">
              <form onSubmit={(e) => handleEditComment(e)} className="edit-comment-form">
                {hasSubmitted && errors?.length > 0 && (
                  <div className="edit-comment-errors">
                    {errors?.map((error, ind) => (
                      <div className="errors" key={ind}>{error}</div>
                    ))}
                  </div>
                )}
                <textarea className="comment-edit-textarea" value={comment} onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={close} type="submit" className="update-comment-button">update comment</button>
              </form>
            </div>
          </div>
        )}
        </Popup>
      </div>
    </div>

  )
}


export default EditCommentComponent;
