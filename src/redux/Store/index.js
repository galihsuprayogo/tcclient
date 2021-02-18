import { combineReducers, createStore } from 'redux';
import {
  loadingReducer,
  profileReducer,
  photoReducer,
  productReducer,
  categoriesReducer,
  setCategoryReducer,
  consumerReducer,
} from '../Reducer';

const rootReducer = combineReducers({
  loadingReducer,
  profileReducer,
  photoReducer,
  productReducer,
  categoriesReducer,
  setCategoryReducer,
  consumerReducer,
});

export const store = createStore(rootReducer);
