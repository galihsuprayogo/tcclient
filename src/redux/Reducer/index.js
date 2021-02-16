import { ILNullPhoto } from '../../assets';
import { globalAction } from '../Action';

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

const photos = {
  photo: ILNullPhoto,
  hasPhoto: false,
  photoDB: ''
};

const products = {
  product: [{
    id: 0,
    store_id: 0,
    type: '',
    procedure: '',
    output: '',
    grade: '',
    price: '',
    image: null
  }]
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

export const productReducer = (state = products, action) => {
  if (action.type === globalAction.SET_PRODUCT) {
    return {
      ...state,
      product: action.value
    };
  }
  return state;
};

export const photoReducer = (state = photos, action) => {
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
