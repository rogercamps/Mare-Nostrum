import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './EditCaptionComponent.css'
import { updatePost } from '../../store/posts'

const UpdatePostForm = ({post}) => {

  const [caption, setCaption] = useState('');
  const user = useSelector(state => state.session.user);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length) return 'Error submitting your post'


    const updatedPost = {
      caption,
      userId: user.id,
      postId: post.id
    };
    dispatch(updatePost(updatedPost));

    setCaption('');
    setValidationErrors([]);
    setHasSubmitted(false);
  }

  useEffect(() => {
    const errors = [];
    if (!caption.length) errors.push("Enter a valid caption");
    setValidationErrors(errors);
  }, [caption])


  return (
    <div className="add-post-form-main-div">
      {hasSubmitted && validationErrors.length > 0 && (
        <div className="errors-info">
          <p>Errors: </p>
          <ul>
            {validationErrors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={(e) => submitForm(e)}>
        <h5>User Name: {user?.username}</h5>
        <div className="form-add-post-caption">
          <label className="add-post-label" htmlFor="caption">
            Add a caption:
          </label>
          <input
            className="add-post-input"
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <button className="button">Submit</button>
      </form>
    </div>
  )
}

export default UpdatePostForm;
