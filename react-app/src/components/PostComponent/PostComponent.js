import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getPosts } from '../../store/posts';
import './PostComponent.css'
// import EditCommentComponent from '../EditCommentComponent/EditCommentComponent';

function PostComponent() {
  const dispatch = useDispatch();
  const photo_id = useParams();
  const [users, setUsers] = useState([]);
  // const [comment, setComment] = useState("");
  const sessionUser = useSelector(state => state.session.user);
  const posts = useSelector(state => Object.values(state.posts))
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  return (
    <>
      <ul className="post-feed-ul">
        <div className="feed-container">
          {posts?.map(post => (
            <Link to={`/post/${post?.id}`} key={post.id}>
              <li className='post-feed' >
                <img src={post?.photo_url} alt='' className="post-feed-img"/>
                <span className="post-caption">{post?.caption}</span>
              {/* <EditCommentComponent updateComment={comment} /> */}
              </li>
            </Link>
          ))}
        </div>
      </ul>
    </>
  )
}


export default PostComponent;
