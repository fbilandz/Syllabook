/*
 * Syllabook
 * author: notASneakyBastard (FBilandzija)
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import { createStore } from 'redux';
import root from './app/redux/reducers';
import Root from './app/handle';

const store = createStore(root);

export default class Syllabook extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <Root onNavigationStateChange={null} />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Syllabook', () => Syllabook);
