import { combineReducers, createStore } from 'redux';
import {
  loadingReducer,
  profileReducer,
  photoReducer,
  productReducer,
  categoriesReducer,
  setCategoryReducer,
  consumerReducer,
  storeReducer,
} from '../Reducer';

const rootReducer = combineReducers({
  loadingReducer,
  profileReducer,
  photoReducer,
  productReducer,
  categoriesReducer,
  setCategoryReducer,
  consumerReducer,
  storeReducer,
});

export const store = createStore(rootReducer);
