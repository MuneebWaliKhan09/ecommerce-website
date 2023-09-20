import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ProductReducer } from './reducers/productReducer';

const reducer = combineReducers({
  products: ProductReducer,

})


let initialState = {

};


const middleware = [thunk]


export const store = legacy_createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

