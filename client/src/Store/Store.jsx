import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ProductReducer, productDetailsReducer } from './reducers/productReducer';
import { userReducer } from './reducers/userReducers';

const reducer = combineReducers({
  products: ProductReducer,
  product: productDetailsReducer,
  user: userReducer

})


let initialState = {

};


const middleware = [thunk]


export const store = legacy_createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

