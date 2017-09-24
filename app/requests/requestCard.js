import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { Divider } from '@shoutem/ui';
import firebase from '../firebase/firebase';

export class RequestCard extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }
  delete(id, reqID) {
    console.log(id, reqID);
    firebase.database().ref(`requests/${id}/${reqID}`).remove();
  }
  render() {
    const { id, reqID } = this.props;
    console.log(this.props);
    return (
      <View> 
        <View style={[{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#BFECCF' }, styles.card]} >
          <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
            <View style={styles.topRow}>
              <Text style={styles.bold}>{this.props.title}</Text>
              <Text>{this.props.username}</Text>
            </View>
            <Text>{this.props.request}</Text>
          </View>
          {this.props.admin && <Icon
            reverse
            name='done'
            color='green'
            onPress={() => this.delete(id, reqID)} />}
        </View>
        <Divider styleName="line" style={{ borderColor: "#565656" }} />
      </View>
    );

  }
}

const styles = StyleSheet.create({
  topRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    width: Dimensions.get("window").width * 0.95,
  },
  bold: {
    fontWeight: 'bold',
  }
})