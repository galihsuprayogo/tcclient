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
  introReducer
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
  introReducer
});

export const store = createStore(rootReducer);
