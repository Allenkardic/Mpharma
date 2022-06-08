import {
  GET_PRODUCTS_START,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_CLEANUP,
} from '../../actionTypes';

import AxiosCall from '../../../utils/AxiosCall';

const getProductsStart = () => {
  return {type: GET_PRODUCTS_START};
};
const getProductsSuccess = payload => {
  return {type: GET_PRODUCTS_SUCCESS, payload};
};

const getProductsFail = payload => {
  return {type: GET_PRODUCTS_FAIL, payload};
};

export const getProductsCleanUp = () => {
  return {type: GET_PRODUCTS_CLEANUP};
};

export const getProductsRequest = () => {
  return async dispatch => {
    dispatch(getProductsStart());
    try {
      const callObj = {
        method: 'GET',
        path: `5c3e15e63500006e003e9795`,
      };
      const data = await AxiosCall(callObj);

      dispatch(getProductsSuccess(data));
    } catch (e) {
      console.log(e, 'erros');
      if (e.response) {
        // Request made and server responded
        dispatch(getProductsFail(e.response.data));
        console.log(e.response, 'erros');
      } else {
        dispatch(getProductsFail(e));
      }
    }
  };
};
