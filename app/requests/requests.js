import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { RequestCard } from './requestCard';
import firebase from '../firebase/firebase';
import { connect } from 'react-redux';
import { addRequest } from '../redux/actions';
import _ from 'lodash';
export class Req extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let f = this.props.req;
    let x = _.keys(this.props.req);
    if (this.props.loading) {
      return <ActivityIndicator size="large" loading={true} />
    }
    return (
      <ScrollView contentContainerStyle={{ backgroundColor: '#ffffff', minHeight: Dimensions.get("window").height }}>
        <View style={styles.container}>
          <List>
            {
              x.map((item, i) => (
                <RequestCard
                  key={i}
                  username={f[item].name}
                  request={f[item].body}
                  title={f[item].title}
                  admin
                />
              ))
            }
          </List>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
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
    marginBottom: 2,
  },
  feedback: {
    textAlign: 'center',
    color: '#996633',
    marginBottom: 3,
  },
  button: {
    backgroundColor: "teal",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 15,
    borderRadius: 10
  },
  buttonText: {
    color: "white",
    backgroundColor: "transparent"
  },
});

const mapStateToProps = (state, ownProps) => {
  return { req: state.requests };
};

const mapDispatchToProps = {
  addRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(Req);