import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { getPosts } from '../../store/posts';
import './AddPostComponent.css'
import { addPost } from '../../store/posts'

const AddPostForm = () => {

  const [photo_url, setPhoto_url] = useState('');
  const [caption, setCaption] = useState('');
  const [users, setUsers] = useState([]);
  const user = useSelector(state => state.session.user);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length) return 'Error submitting your post'


    const post = {
      caption,
      author: user.id,
      photo_url,
    };
    dispatch(addPost(post));

    setCaption('');
    setPhoto_url('');
    setValidationErrors([]);
    setHasSubmitted(false);
    history.push("/feed");
  }

  useEffect(() => {
    const errors = [];
    if (!caption.length) errors.push("Enter a valid caption");
    if (!photo_url.length) errors.push("Enter a valid image");
    setValidationErrors(errors);
  }, [caption, photo_url])


  return (
    <div className="add-post-form-main-div">
      <h1>Add Post</h1>
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
        <div className="form-add-post-photo">
          <label className="add-post-label" htmlFor="photo">
            Add Photo URL:
          </label>
          <input
            className="add-post-input"
            type="text"
            value={photo_url}
            onChange={(e) => setPhoto_url(e.target.value)}
          />
        </div>
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

export default AddPostForm;
