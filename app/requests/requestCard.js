import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';

export class RequestCard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    console.log(this.props);
    this.delete = this.delete.bind(this);
  }
  delete = (id) => {

  }
  render() {
    const { id } = this.props;
    return (
      <View style={[{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'powderblue' }, styles.card]} >
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
          onPress={(id) => this.delete(id)} />}
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
    width: Dimensions.get("window").width * 0.85,
  },
  bold: {
    fontWeight: 'bold',
  }
})