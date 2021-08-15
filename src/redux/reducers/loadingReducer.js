import {LOADING} from '../actions/actionType';

const initialState = {
  isLoading: true,
};

const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {...state, isLoading: action.payload};
    default:
      return state;
  }
};

export default LoadingReducer;
