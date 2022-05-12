const GET_POSTS = 'POSTS/GET_PHOTOS';

const getAllPosts = (posts) => ({
  type: GET_POSTS,
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

const initialState = {};

const postsReducer =  (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_POSTS:
      newState = { ...state }
      action.payload.forEach(posts => newState[posts.id] = posts);
      return {...newState,...state};
      default:
        return state;
    }
  }

  export default postsReducer;
