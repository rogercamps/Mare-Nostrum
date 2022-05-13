const GET_POSTS = 'POSTS/GET_PHOTOS';
const GET_SINGLE_POST = 'POSTS/GET_SINGLE_POST';
const ADD_POST = 'POSTS/ADD_POST'
const DELETE_POST = 'POSTS/DELETE_POST'

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


const deleteSinglePost = (id) =>({
  type: DELETE_POST,
  post_id: id
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

export const addPost = (post) => async dispatch => {
  const response = await fetch(`/api/posts/new`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post)
  });
  console.log('response thunk', response);
  if (response.ok) {
    console.log('is it here?');
    const post = await response.json();
    console.log('thunk post res-----' , post);
    dispatch(addSinglePost(post));
  } else {
    return "ERROR @ ADD_POST"
  }
}

export const deletePost = (postId) => async dispatch =>{
  const response = await fetch(`/api/posts/${postId}`,{
      method:"DELETE",
  });

  if (response.ok){
      dispatch(deleteSinglePost(postId))
  } else {
      return "ERROR @ DELETE_POST"
  }
}

const initialState = {};

const postsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_POSTS:
      newState = { ...state }
      action.payload.forEach(posts => newState[posts.id] = posts);
      return { ...newState, ...state };
    case GET_SINGLE_POST:
      newState = {}
      newState[action.post.id] = action.post
      return newState;
    // case ADD_POST:
    //   newState = {...state};
    //   newState[action.post.id] = action.post
    //   return newState;
    case ADD_POST:
      newState = { ...state };
      newState[action.post.id] = action.post;
      return newState;
    case DELETE_POST:
      newState = {...state}
      delete newState[action.post_id]
      return newState
    default:
      return state;
  }
}

export default postsReducer;
