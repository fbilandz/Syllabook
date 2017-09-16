import React, {
  Component,
} from 'react';
import {
  Text,
  View,
  Dimensions,
  Alert,
  StyleSheet,
} from 'react-native';
import { Button } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import firebase from '../firebase/firebase';
import moment from 'moment';
import styles from '../components/style';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';

export class RateScreen extends Component {
  static propTypes = {
    rating: React.PropTypes.number,
    props: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      // review: "",
      rating: 0,
      props,
    }
    this.justRateIt = this.justRateIt.bind(this);
    this.commentIt = this.commentIt.bind(this);
  }
  justRateIt() {
    const { rating } = this.state;
    if (rating === 0) {
      Alert.alert("Rating can't be 0", "Rate from 1 to 5");
      return;
    }
    const { topic, grade, semester, subject } = this.state.props.navigation.state.params;
    const { id } = this.props.uniqueID;
    firebase.database().ref(`ratings/${id}/${grade}/${semester}/${subject}/${topic}`)
      .push({
        name: this.props.email,
        rating,
      });
    const backAction = NavigationActions.back({
      key: this.state.props.navigation.state.key
    })
    this.props.navigation.dispatch(backAction);
  }
  commentIt() {
    const { rating } = this.state;
    if (rating === 0) {
      Alert.alert("Rating can't be 0", "Rate from 1 to 5");
      return;
    }
    const { topic, grade, semester, subject } = this.state.props.navigation.state.params;
    const { key } = this.state.props.navigation.state;
    this.props.navigation.navigate('AddACommentScreen', { topic, grade, semester, subject, key, rating });
  }
  render() {
    const { props } = this.state;
    console.log(this.props);
    return (
      <View style={styles.containerz}>
        <Text>Rate this topic</Text>
        <StarRating
          rating={this.state.rating}
          selectedStar={(rate) => this.setState({ rating: rate })}
          maxStars={5}
        />
        <Button buttonStyle={{ width: 320, marginVertical: 15 }} backgroundColor="#E3AD2B" title="Just rate it" onPress={() => this.justRateIt()} iconRight icon={{ name: 'hand-o-up', type: 'font-awesome' }} />
        <Button buttonStyle={{ width: 320, }} backgroundColor="green" title="Leave a comment" onPress={() => this.commentIt()} iconRight icon={{ name: 'comment', type: 'material' }} />
      </View>
    );
  }
}

const mapDispatchToProps = {
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(RateScreen)
