import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { getPosts } from '../../store/posts';
import './AddPostComponent.css'
import { addPost } from '../../store/posts'
import Popup from 'reactjs-popup';


const AddPostForm = () => {

  const [image, setImage] = useState();
  const [caption, setCaption] = useState('');
  const [users, setUsers] = useState([]);
  const user = useSelector(state => state.session.user);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const formData = new FormData();


  const submitForm = (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length) return 'Error submitting your post'


    // const post = {
    //   caption,
    //   author: user.id,
    //   image,
    // };
    formData.append('image', image)
    formData.append('author', user.id)
    formData.append('caption', caption)
    dispatch(addPost(formData)).then((res) => {
      if (!res?.ok) {
        console.log(res?.errors)
        setErrors(res?.errors)
      } else {
        setErrors([])
      }
    })

    setCaption('');
    setImage('');
    setValidationErrors([]);
    setHasSubmitted(false);
    history.push("/feed");
  }

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }

  useEffect(() => {
    const errors = [];
    if (!caption.length) errors.push("Enter a valid caption");
    setValidationErrors(errors);
  }, [caption, image])


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
      <h5>User Name: {user?.username}</h5>
      <Popup trigger={<button>Add Post</button>} position="right center">

        <form onSubmit={(e) => submitForm(e)}>
          <div className="form-add-post-photo">
            <label className="add-post-label" htmlFor="photo">
              Add Photo URL:
            </label>
            <input
              className="add-post-input"
              type="file"
              accept="image/*"
              onChange={updateImage}
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
      </Popup>

    </div>
  )
}

export default AddPostForm;
