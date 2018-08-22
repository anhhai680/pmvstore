import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reactotron from 'reactotron-react-native';

import './ReactotronConfig';
import reducers from './reducer';



const thunkMiddleware = [thunk];
const store = null;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (__DEV__) {
  store = Reactotron.createStore(
    reducers,
    compose(
      applyMiddleware(...thunkMiddleware)
    )
  );
} else {
  store = createStore(reducers, {}, compose(applyMiddleware(...thunkMiddleware)));
}

export default store;