import React from 'react'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import authScreen from '../screens/authScreen.js'
import lastScreen from '../screens/lastScreen.js'
const switchNavigator=createSwitchNavigator({
  Auth:authScreen,
  Last:lastScreen
}) 


export default createAppContainer(switchNavigator)