import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { getPosts } from '../../store/posts';
import './AddPostComponent.css'
import { addPost } from '../../store/posts'
import Popup from 'reactjs-popup';
import add_post_icon from '../../images/New_Post.png'


const AddPostForm = () => {

  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');
  const [users, setUsers] = useState([]);
  const user = useSelector(state => state.session.user);
  // const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const formData = new FormData();


  const submitForm = (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    // if (validationErrors.length) return 'Error submitting your post'


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
        // console.log(res?.errors[1].split(':')[1])

        setErrors(res.errors)
      } else {
        setErrors([])
      }
    })

    setCaption('');
    setImage('');
    setErrors([]);
    // setValidationErrors([]);
    setHasSubmitted(false);
    history.push("/feed");
  }

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }

  // useEffect(() => {
  //   const errors = [];
  //   if (!caption.length) errors.push("Enter a valid caption");
  //   setValidationErrors(errors);
  // }, [caption, image])

  return (
    <div className="add-post-form-main-div">
      <Popup trigger={<img src={add_post_icon} alt="Add post" />} modal>
        {close => (
          <div className="modal">
            <div className="content">
              <form className="add-post-form" onSubmit={(e) => submitForm(e)}>
                {errors.length > 0 && (
                  <div className="errors-info">
                    <ul>
                      {errors.map(error => (
                        <li key={error}>{error.split(':')[1]}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="form-add-post-photo">
                  <label className="add-post-label" htmlFor="photo">
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
                <button onClick={close} className="button">Submit</button>
              </form>

            </div>
          </div>
        )}
      </Popup>

    </div>
  )
}

export default AddPostForm;
