import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import Navigator from './navigation/formNavigator'
import {Provider} from 'react-redux'
import {createStore,combineReducers,applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import AuthReducer from './store/Authreducer'
export default function App() {
  const mainReducer=combineReducers({
    auth:AuthReducer,
   })
   const store =createStore(mainReducer,applyMiddleware(ReduxThunk))
  return (
    <Provider store={store}>
      <Navigator/>
    </Provider>
   
  )
}

