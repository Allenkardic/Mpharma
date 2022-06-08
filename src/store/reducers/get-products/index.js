import {
  GET_PRODUCTS_START,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_CLEANUP,
} from '../../actionTypes';

import {getProducts} from '../../initialState';

const getProductsReducer = (state = getProducts, action) => {
  switch (action.type) {
    case GET_PRODUCTS_START:
      return {...state, isLoading: true, error: null};
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        result: action.payload,
        isLoading: false,
        isSuccessful: true,
        error: null,
      };
    case GET_PRODUCTS_FAIL:
      return {...state, error: action.payload, isLoading: false};
    case GET_PRODUCTS_CLEANUP:
      return {...state, error: null, isLoading: false, isSuccessful: false};
    default:
      return state;
  }
};

export default getProductsReducer;
