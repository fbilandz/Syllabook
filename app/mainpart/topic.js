import React, { Component } from 'react';
import {
  ScrollView,
  ListView,
  Screen,
  View,
  Divider,
  Title,
} from '@shoutem/ui';
import { Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationBar } from '@shoutem/ui/navigation';
import * as _ from 'lodash';
import { GameStats } from '../components/Stats';
import { GameBanner } from '../components/Banner';
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
      data: this.props.database[grade][semester][subject][topic],
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
    console.log(this.props);
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

  render() {
    const { imageUrl, title } = this.props.navigation.state.params;
    const { data } = this.state;
    return (
      <Screen styleName="full-screen paper">
        <ScrollView>
          <GameBanner articleImage={imageUrl} title={title} newsAuthor={data.author} />
          <GameStats lastReview={data.timestamp} rating={data.rating} />
          <Button raised backgroundColor="green" title="See all" iconRight icon={{ name: 'ios-arrow-forward-outline', type: 'ionicon' }} />
          <Divider styleName="line" />
          <Title styleName="h-center">Reviews</Title>
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