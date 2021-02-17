import { combineReducers, createStore } from 'redux';
import {
  loadingReducer,
  profileReducer,
  photoReducer,
  productReducer,
  categoriesReducer,
  setCategoryReducer
} from '../Reducer';

const rootReducer = combineReducers({
  loadingReducer,
  profileReducer,
  photoReducer,
  productReducer,
  categoriesReducer,
  setCategoryReducer
});

export const store = createStore(rootReducer);
