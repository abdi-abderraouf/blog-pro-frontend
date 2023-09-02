import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice'; // Make sure the import is correct
import postReducer from './slices/postSlice';
import likeReducer from './slices/likeSlice';
import commentReducer from './slices/commentSlice';
import categoryReducer from './slices/categorySlice';
import { passwordReducer } from './slices/passwordSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  post: postReducer,
  like: likeReducer,
  comment: commentReducer,
  category: categoryReducer,
  password:passwordReducer,
});

export default rootReducer;
