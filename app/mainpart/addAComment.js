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

export class AddACommentScreen extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      review: '',
      rating: props.rating || 0,
      props,
    };
    this.rateIt = this.rateIt.bind(this);
  }
  componentWillMount() {
    if (this.state.props.review) {
      this.setState({
        review: this.state.props.review,
      });
    }
  }
  rateIt() {
    const { review } = this.state;
    if (review.length === 0) {
      Alert.alert("Comment can't be empty", "Write something or go back and just rate it");
      return;
    }
    const { topic, grade, subject, semester, key, rating } = this.props.navigation.state.params;
    const { id } = this.props.uniqueID;
    firebase.database().ref(`ratings/${id}/${grade}/${semester}/${subject}/${topic}`)
      .push({
        name: this.props.email,
        rating,
      });
    firebase.database().ref(`topics/${id}/${grade}/${semester}/${subject}/${topic}/comments`)
      .push({
        user: this.props.email,
        rating,
        comment: review,
        timestamp: moment(),
      })
    firebase.database().ref(`topics/${id}/${grade}/${semester}/${subject}/${topic}/comments`)
      .update({
        "value": 1,
      })
    const backAction = NavigationActions.back({
      key: key
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
        <TextInput
          style={{
            marginTop: 55,
            marginBottom: 5,
            width: Dimensions.get('window').width * 0.8,
            alignSelf: 'center',
          }}
          editable
          onChangeText={(text) => this.setState({ review: text })}
          multiline
          numberOfLines={10}
          placeholder="Write a review"
          value={this.state.review}
          placeholderTextColor="orange"
        />

        <Button
          raised
          backgroundColor="green"
          onPress={this.rateIt}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddACommentScreen)
