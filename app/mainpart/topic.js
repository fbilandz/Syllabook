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
import { NavigationBar } from '@shoutem/ui/navigation';
import * as _ from 'lodash';
import { GameStats } from '../components/Stats';
import { GameBanner } from '../components/Banner';
import { Comment } from '../components/comment';
import { connect } from 'react-redux';
import {

} from '../redux/actions';

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
      data: this.props.database[grade][semester][subject][topic],
      width: Dimensions.get("window").width,
    };
  }
  openListScreen(id) {
    const { navigateTo, article } = this.props;
    const route = {
      screen: ext('ReviewListScreen'),
      title: article.title,
      props: {
        article,
        id,
        getReviews: this.getReview,
      },
    };
    navigateTo(route);
  }

  addAReview() {
    const { navigateTo, article } = this.props;
    const route = {
      screen: ext('AddAReviewScreen'),
      props: {
        id: article.id,
        onClose: closeModal,
      },
    };
    navigateTo(route);
  }
  goToPhoto = (item) => {
    this.props.navigation.navigate('Photo', { unique_id: this.state.data.unique_id, topic: item, grade: this.state.data.grade, semester: this.state.data.semester, subject: this.state.data.subject, nova: false })
  }
  goToImages = (data) => {
    this.props.navigation.navigate('Images', { topic: data, grade: this.state.data.grade, semester: this.state.data.semester, subject: this.state.data.subject });
  }
  render() {
    const { imageUrl, title } = this.props.navigation.state.params;
    const { data, width } = this.state;
    console.log(data);
    const x = data.comments.value === 0 ? 0 : _.values(data.comments).slice(0, 5);
    return (
      <Screen styleName="full-screen paper">
        <ScrollView>
          <GameBanner articleImage={imageUrl} title={title} newsAuthor={data.author} />
          <GameStats lastReview={data.timestamp} rating={data.rating} description={data.description} />
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 5 }}>
            <Button raised backgroundColor="#E3AD2B" title="Add to topic" iconRight icon={{ name: 'plus', type: 'octicon' }} buttonStyle={{ width: width * 0.4 }} onPress={() => this.goToPhoto(data)} />
            <Button raised backgroundColor="green" title="See all" iconRight icon={{ name: 'ios-arrow-forward-outline', type: 'ionicon' }} onPress={() => this.goToImages(data)} buttonStyle={{ width: width * 0.4 }} />
          </View>
          <Divider styleName="line" style={{ marginBottom: 5 }} />
          <Title styleName="h-center">Comments</Title>
          <List>
            {
              x === 0 ? <Text>No comments yet</Text> : x.map((item, i) => (
                item !== 1 ? <Comment
                  key={i}
                  data={item}
                /> : null
              ))
            }
          </List>
        </ScrollView>
      </Screen>
    );
  }
}

const mapDispatchToProps = {

};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(Topic);