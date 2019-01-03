/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, { Component }  from 'react';
 import {
   Platform,
   StyleSheet,
   Text,
   Button,
   Alert,
   View,
   AppRegistry,
   Dimensions} from 'react-native';
 import { Camera, Permissions } from 'expo';
 import { createStackNavigator, createAppContainer } from 'react-navigation'
 import RNTextDetector from "react-native-text-detector";

 import BestScreen from './screens/BestScreen'
 import HomeScreen from './screens/HomeScreen'
 import GalleryScreen from './screens/GalleryScreen'

const AppStack = createStackNavigator(
  {
  Home: {screen: HomeScreen},
  Camera: {screen: BestScreen},
  Gallery:{screen:GalleryScreen}
  },{ headerMode: 'none' },
  {
    initialRouteName: 'Home',
  }
);
const AppContainer = createAppContainer(AppStack);

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  cameradesign: {
    flex:1,
    alignItems:'center',
    justifyContent:'flex-end'
  }
});
