import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import {
  Title,
  Divider
} from '@shoutem/ui';
import { Button } from 'react-native-elements';

export class Delete extends Component {
  static propTypes = {
    onPress: React.PropTypes.func.isRequired,
  };
  render() {
    return (
      <View style={{ justifyContent: 'space-between', marginVertical: 10, alignContent: 'center', height: 90, }}>
        <Title styleName="h-center">Delete topic</Title>
        <Divider styleName="line" style={{ marginVertical: 6, }} />
        <Button onPress={this.props.onPress} backgroundColor="red" title="Delete" />
      </View>
    )
  }
}