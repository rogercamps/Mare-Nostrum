const GET_POSTS = 'POSTS/GET_PHOTOS';
const GET_SINGLE_POST = 'POSTS/GET_SINGLE_POST';
const ADD_POST = 'POSTS/ADD_POST';
const DELETE_POST = 'POSTS/DELETE_POST';
const UPDATE_POST = 'POSTS/UPDATE_POST';

const getAllPosts = (posts) => ({
  type: GET_POSTS,
  payload: posts
})

const getSinglePost = (post) => ({
  type: GET_SINGLE_POST,
  payload: post
})

const addSinglePost = (post) => ({
  type: ADD_POST,
  post
})


const deleteSinglePost = (id) => ({
  type: DELETE_POST,
  post_id: id
})

const updatePostAction = (post) => ({
  type: UPDATE_POST,
  post
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
    return post;
  }
}

export const addPost = (formData) => async dispatch => {
  const response = await fetch(`/api/posts/new`, {
    method: "POST",
    body: formData
  });
  if (response.ok) {
    const post = await response.json();
    dispatch(addSinglePost(post));
    return post
  } else if (response.status < 500) {
    const data = response.json()
    return data
  }
  // else {
  //   return "ERROR @ ADD_POST"
  // }
}

export const deletePost = (postId) => async dispatch => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteSinglePost(postId))
  } else {
    return "ERROR @ DELETE_POST"
  }
}

export const updatePost = (post) => async dispatch => {
  const response = await fetch(`/api/posts/${post.postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post)
  });
  console.log('response thunk updatePost', response);
  if (response.ok) {
    const post = await response.json();
    dispatch(updatePostAction(post));
    return post
  } else {
    return "ERROR @ UPDATE_POST"
  }
}

const initialState = {};

const postsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_POSTS:
      newState = {}
      action.payload.forEach(posts => newState[posts.id] = posts);
      return newState;
    case GET_SINGLE_POST:
      newState = {}
      newState[action.post.id] = action.post
      return newState;
    case ADD_POST:
      newState = { ...state };
      newState[action.post.id] = action.post;
      return newState;
    case DELETE_POST:
      newState = { ...state }
      delete newState[action.post_id]
      return newState
    case UPDATE_POST:
      newState = { ...state };
      newState[action.post.id] = action.post;
      return newState;
    default:
      return state;
  }
}

export default postsReducer;
