import { globalAction } from '../Action';
import { ILNullPhoto } from '../../assets';

const initialState = {
  loading: false
};

const profile = {
  photo: ILNullPhoto,
  id: '',
  name: '',
  store_name: '',
  phone_number: '',
  address: ''
};

const photo = {
  photo: ILNullPhoto,
  hasPhoto: false,
  photoDB: ''
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

export const profileReducer = (state = profile, action) => {
  if (action.type === globalAction.SET_PROFILE) {
    return {
      ...state,
      ...action.value
    };
  }
  return state;
};

export const photoReducer = (state = photo, action) => {
  if (action.type === globalAction.SET_PHOTO) {
    return {
      ...state,
      photo: action.value
    };
  }
  if (action.type === globalAction.SET_HAS_PHOTO) {
    return {
      ...state,
      hasPhoto: action.value
    };
  }
  if (action.type === globalAction.SET_PHOTO_DB) {
    return {
      ...state,
      photoDB: action.value
    };
  }
  return state;
};
