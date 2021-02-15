import { combineReducers, createStore } from 'redux';
import {
  loadingReducer, profileReducer, photoReducer, productReducer
} from '../Reducer';

const rootReducer = combineReducers({
  loadingReducer, profileReducer, photoReducer, productReducer
});

export const store = createStore(rootReducer);
