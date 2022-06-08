import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';

import appReducer from './reducers';

const middlewares = [thunk];

const persistConfig = {
  key: 'mpharma-root-persisted',
  storage: AsyncStorage,
  //   whitelist: ['login', 'getUser', 'getCustomer'],
};

const persistedReducer = persistReducer(persistConfig, appReducer);
const composeEnhancers = compose;
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

const persistor = persistStore(store);
const getPersistor = () => persistor;
const getStore = () => store;
const getState = () => {
  return store.getState();
};
export {getStore, getState, getPersistor};
