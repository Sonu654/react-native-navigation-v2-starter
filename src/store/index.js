import {createStore, applyMiddleware} from 'redux';
import {persistCombineReducers, persistStore} from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import reducers from '../reducers';
export var storeObj = {};
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
  whitelist: ['user', 'app'],
};
export default () => {
  return new Promise((resolve, reject) => {
    try {
      var store = createStore(
        persistCombineReducers(persistConfig, reducers),
        {},
        applyMiddleware(logger, thunk),
      );
      persistStore(store, {}, () => {
        storeObj = store;
        resolve(store);
      });
    } catch (e) {
      reject(e);
    }
  });
};
