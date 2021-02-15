import { combineReducers, createStore } from 'redux';
import { loadingReducer, profileReducer, photoReducer } from '../Reducer';

const rootReducer = combineReducers({
  loadingReducer, profileReducer, photoReducer
});

export const store = createStore(rootReducer);
