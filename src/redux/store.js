import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reactotron from 'reactotron-react-native';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";// defaults to localStorage for web and AsyncStorage for react-native

import './ReactotronConfig';
import reducers from './reducer';


const thunkMiddleware = [thunk];
const store = null;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['navigation'] // navigation will not be persisted
}

const persistedReducer = persistReducer(persistConfig, reducers);

if (__DEV__) {
  store = Reactotron.createStore(
    //reducers,
    persistedReducer,
    compose(
      applyMiddleware(...thunkMiddleware)
    )
  );
} else {
  store = createStore(persistedReducer, {}, compose(applyMiddleware(...thunkMiddleware)));
}
let persistor = persistStore(store);

export default { store, persistor }