/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import firebase from './app/firebase/firebase';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import root from './app/redux/reducers';
import { Root } from './app/handle';
import thunk from 'redux-thunk';
const store = createStore(root, applyMiddleware(thunk));

export default class Syllabook extends Component {
  constructor(props) {
    super(props);
    console.log(store);
  }
  render() {
    console.log(store.getState());
    return (
      <Provider store={store}>
        <Root />
      </Provider>
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
});

AppRegistry.registerComponent('Syllabook', () => Syllabook);
