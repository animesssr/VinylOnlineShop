import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './redux.slice';
import storage from './storage.js'

const reducer = {
  cart: cartReducer,
};

const store = configureStore({
  reducer,
});

export default store;


