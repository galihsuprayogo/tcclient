import { globalAction } from '../Action';

const initialState = {
  loading: false
};

export const loadingReducer = (state = initialState, action) => {
  if (action.type === globalAction.SET_LOADING) {
    return {
      ...state,
      loading: action.value
    };
  }
  return state;
};

const profile = {
  name: 'Belum Ada',
  address: 'Belum Ada'
};

export const profileReducer = (state = profile, action) => {
  if (action.type === globalAction.SET_NAME) {
    return {
      ...state,
      name: action.value
    };
  }
  if (action.type === globalAction.SET_ADDRESS) {
    return {
      ...state,
      address: action.value
    };
  }
  return state;
};
