import React, { Component } from 'react';
import {
  ScrollView,
  ListView,
  Screen,
  View,
  Divider,
  Title
} from '@shoutem/ui';
import { Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Button, List } from 'react-native-elements';
import * as _ from 'lodash';
import { GameStats } from '../components/Stats';
import { GameBanner } from '../components/Banner';
import { Comment } from '../components/comment';
import firebase from '../firebase/firebase';
import { connect } from 'react-redux';
import { Delete } from '../components/delete';
import { NavigationActions } from 'react-navigation';

export class Topic extends Component {
  constructor(props) {
    super(props);
    const { semester, grade, subject, topic } = this.props.navigation.state.params;
    this.state = {
      loading: true,
      rating: 0,
      lastReview: 0,
      semester,
      grade,
      subject,
      topic,
      width: Dimensions.get("window").width,
    };
  }
  seeMore = (data) => {
    this.props.navigation.navigate('CommentList', { topic: this.state.topic, imageUrl: data.imageUrl, title: data.title, unique_id: this.props.uniqueID.id, grade: this.state.grade, semester: this.state.semester, subject: this.state.subject });
  }
  deleteTopic = () => {
    const { uniqueID } = this.props;
    const { grade, subject, semester, topic } = this.state;
    const { key } = this.props.navigation.state;
    const back = NavigationActions.back({
      key,
    })
    firebase.database()
      .ref(`topics/${uniqueID.id}/${grade}/${semester}/${subject}/${topic}`)
      .remove((err) => console.log(err));
    this.props.navigation.dispatch(back);
  }
  addAReview() {
    this.props.navigation.navigate('RateScreen', { topic: this.state.topic, grade: this.state.grade, semester: this.state.semester, subject: this.state.subject, key: this.props.navigation.state.key });
  }
  goToPhoto = (item) => {
    this.props.navigation.navigate('Photo', { unique_id: this.props.uniqueID.id, topic: this.state.topic, grade: this.state.grade, semester: this.state.semester, subject: this.state.subject, nova: false })
  }
  goToImages = (data) => {
    this.props.navigation.navigate('Images', { topic: data, grade: this.state.grade, semester: this.state.semester, subject: this.state.subject });
  }
  render() {
    const { imageUrl, title } = this.props.navigation.state.params;
    const { width } = this.state;
    const { data } = this.props;
    if (data !== undefined) {
      const comments = _.values(data.comments);
      const x = data.comments.value === 0 ? 0 : comments.slice(0, 5);
      return (
        <Screen styleName="full-screen paper">
          <ScrollView>
            <GameBanner articleImage={imageUrl} title={title} newsAuthor={data.author} timeUpdated={data.timestamp} />
            <GameStats lastReview={data.timestamp} rating={data.rating} description={data.description || ""} />
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 5 }}>
              <Button raised backgroundColor="#E3AD2B" title="Add to topic" iconRight icon={{ name: 'plus', type: 'octicon' }} buttonStyle={{ width: width * 0.4 }} onPress={() => this.goToPhoto(data)} />
              <Button raised backgroundColor="green" title="See all" iconRight icon={{ name: 'ios-arrow-forward-outline', type: 'ionicon' }} onPress={() => this.goToImages(data)} buttonStyle={{ width: width * 0.4 }} />
            </View>
            <Divider styleName="line" style={{ marginBottom: 5 }} />
            <Button backgroundColor="green" title="Rate and Comment" buttonStyle={{ marginVertical: 10 }} iconRight icon={{ name: 'rate-review', type: 'material' }} onPress={() => this.addAReview()} />
            <Title styleName="h-center">Comments</Title>
            <List>
              {
                x === 0 ? <Text>No comments yet</Text> : x.map((item, i) => (
                  item !== 1 || i > 4 ? <Comment
                    key={i}
                    data={item}
                  /> : null
                ))
              }
              {comments.length > 5 && <Button title="See more" iconRight icon={{ name: 'angle-right', type: 'font-awesome' }} onPress={() => this.seeMore(data)} />}
            </List>
            {this.props.uniqueID.admin && <Delete onPress={this.deleteTopic} />}
          </ScrollView>
        </Screen>
      );
    }
    return null;
  }
}

const mapDispatchToProps = {

};

const mapStateToProps = (state, ownProps) => {
  const { grade, subject, semester, topic } = ownProps.navigation.state.params;
  return {
    data: state.database[grade][semester][subject][topic],
    uniqueID: state.uniqueID
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Topic);