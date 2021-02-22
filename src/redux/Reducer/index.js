import { ILNullPhoto } from '../../assets';
import { globalAction } from '../Action';

const initialState = {
  loading: false
};

const categories = {
  type: [
    { label: '-- Pilih --', value: '-- Pilih --' },
    { label: 'Arabica', value: 'Arabica' },
    { label: 'Robusta', value: 'Robusta' }
  ],
  procedure: [
    { label: '-- Pilih --', value: '-- Pilih --' },
    { label: 'Fullwash', value: 'Fullwash' },
    { label: 'Semiwash', value: 'Semiwash' }
  ],
  output: [
    { label: '-- Pilih --', value: '-- Pilih --' },
    { label: 'Green Bean', value: 'Green Bean' },
    { label: 'Roasted Bean', value: 'Roasted Bean' }
  ],
  grade: [
    { label: '-- Pilih --', value: '-- Pilih --' },
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' }
  ]
};

const setCategory = {
  type: '-- Pilih --',
  procedure: '-- Pilih --',
  output: '-- Pilih --',
  grade: '-- Pilih --'
};

const consumer = {
  consumerId: 0,
  type: '',
  procedure: '',
  output: '',
  grade: '',
  minimum: 0,
  maximum: 0,
  minimumLimit: 0,
  maximumLimit: 0,
  address: '',
  latitude: '',
  longitude: ''
};

const profile = {
  photo: ILNullPhoto,
  id: '',
  name: '',
  store_name: '',
  phone_number: '',
  address: '',
  latitude: '',
  longitude: ''
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
    price: 0,
    image: null
  }]
};

export const categoriesReducer = (state = categories, action) => {
  if (action.type === globalAction.SET_CATEGORIES) {
    return {
      ...state,
      ...action.value
    };
  }
  return state;
};

export const consumerReducer = (state = consumer, action) => {
  if (action.type === globalAction.SET_CONSUMER) {
    return {
      ...state,
      ...action.value
    };
  }
  return state;
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

export const setCategoryReducer = (state = setCategory, action) => {
  if (action.type === globalAction.SET_TYPE) {
    return {
      ...state,
      type: action.value
    };
  }
  if (action.type === globalAction.SET_PROCEDURE) {
    return {
      ...state,
      procedure: action.value
    };
  }
  if (action.type === globalAction.SET_OUTPUT) {
    return {
      ...state,
      output: action.value
    };
  }
  if (action.type === globalAction.SET_GRADE) {
    return {
      ...state,
      grade: action.value
    };
  }
  return state;
};
