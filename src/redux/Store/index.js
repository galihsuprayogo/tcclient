import { combineReducers, createStore } from 'redux';
import { loadingReducer, profileReducer } from '../Reducer';

const rootReducer = combineReducers({
  loadingReducer, profileReducer
});

export const store = createStore(rootReducer);
