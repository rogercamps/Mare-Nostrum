const GET_POSTS = 'POSTS/GET_PHOTOS';
const GET_SINGLE_POST = 'POSTS/GET_SINGLE_POST';

const getAllPosts = (posts) => ({
  type: GET_POSTS,
  payload: posts
})

const getSinglePost = (posts) => ({
  type: GET_SINGLE_POST,
  payload: posts
})

export const getPosts = () => async (dispatch) => {
  const response = await fetch('/api/posts/')
  if (response.ok) {
    const posts = await response.json();
    dispatch(getAllPosts(posts.posts))
    return response;
  }
}

export const getPost = (post_id) => async (dispatch) => {
  const response = await fetch(`/api/posts/${post_id}`)
  if (response.ok) {
    const post = await response.json();
    dispatch(getSinglePost(post))
    // return response;
    return post;
  }
}

const initialState = {};

const postsReducer =  (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_POSTS:
      newState = { ...state }
      action.payload.forEach(posts => newState[posts.id] = posts);
      return {...newState,...state};
    case GET_SINGLE_POST:
      newState = {}
      newState[action.post.id] = action.post
      return newState;
    default:
      return state;
    }
  }

  export default postsReducer;
