import {combineReducers} from 'redux';

import getProducts from './get-products';

const appReducer = combineReducers({
  getProducts,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    state = {};
  }

  return appReducer(state, action);
};

export default rootReducer;
