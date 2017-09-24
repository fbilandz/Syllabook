import React, {
  Component,
} from 'react';
import {
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';
import { Screen } from '@shoutem/ui';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from '../firebase/firebase';
import _ from 'lodash';
import moment from 'moment';
import { NavigationActions } from 'react-navigation';

export class CreateNewRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request: '',
      title: '',
      props,
    };
    this.submitRequest = this.submitRequest.bind(this);
  }
  componentWillMount() {
    if (this.state.props.request) {
      this.setState({
        request: this.state.props.request,
      });
    }
  }
  submitRequest() {
    const { request, title } = this.state;
    if (title.length === 0) {
      Alert.alert("Title can't be empty", "Name it");
      return;
    }
    if (request.length === 0) {
      Alert.alert("Request can't be empty", "Explain your request");
      return;
    }
    const { id, name } = this.props.uniqueID;
    firebase.database().ref(`requests/${id}/`)
      .push({
        name,
        body: request,
        title,
        timestamp: moment(),
      })
    const backAction = NavigationActions.back({
      key: this.props.navigation.state.key
    })
    this.props.navigation.dispatch(backAction);
  }
  render() {
    // const styles = this.props.style;
    const { props } = this.state;
    console.log(this.props);
    return (
      <Screen styleName="full-screen paper" style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <TextInput style={{ width: Dimensions.get('window').width * 0.8, marginTop: 55 }} placeholderTextColor="green" placeholder="Title" editable onChangeText={(title) => this.setState({ title: title })} />
        <TextInput
          style={{
            marginTop: 35,
            marginBottom: 5,
            width: Dimensions.get('window').width * 0.8,
            alignSelf: 'center',
          }}
          editable
          onChangeText={(text) => this.setState({ request: text })}
          multiline
          numberOfLines={4}
          placeholder="Explain your request"
          value={this.state.request}
          placeholderTextColor="orange"
        />

        <Button
          raised
          backgroundColor="green"
          onPress={this.submitRequest}
          title="Submit"
          buttonStyle={{ width: Dimensions.get("window").width * 0.8 }}
        />
      </Screen>
    );
  }
}

const mapDispatchToProps = {
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewRequest);
