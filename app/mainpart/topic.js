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
    this.state = {
      loading: true,
      rating: 0,
      lastReview: 0
    };
    console.log(this.props);
  }
  getRating(data) {
    if (data === null || data === undefined) return 0;
    let rating = 0;
    let count = 0;
    Object.keys(data).map(function (dataKey, index) {
      rating += data[dataKey].rating;
      count++;
    });
    return rating / (count);
  }

  insertIntoReducer(data) {
    const { addReviews, article } = this.props;
    /*
    Object.keys(data).map(function (dataKey, index) {
      addAReview(data[dataKey], dataKey);
    });*/
    addReviews(data, article.id);
  }
  getReview() {
    console.log(this.props);
    const { addReviews, reviewsLoading, reviewsFetchError, reviewsLoaded, mapReviews, reviews, article } = this.props;
    reviewsLoading();
    fetch('https://gamereviewsapp.firebaseio.com' + '/reviews/reviews/' + this.props.article.id + '.json' + '?auth=' + 'JfsF3SK5tnCZPlC3FG1XXKeon7U3LVk0kZ2SZ6Uk')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        //  selected review are saved in responseJson.selReview
        this.insertIntoReducer(responseJson);
        this.setState({
          loading: false,
        });
        reviewsLoaded();
        this.setState({
          rating: this.getRating(this.props.reviews[this.props.article.id]),
          lastReview: this.getLastReview(),
        });
        this.mapToMap();
        //  addFirst(x, this.props.article.id);
        //  addReviews(this.state.data)
      })
      .catch((error) => {
        reviewsFetchError();
        console.log(error);
      });
  }

  getLastReview() {
    const { reviews, article } = this.props;
    const last = Object.keys(reviews[article.id])[Object.keys(reviews[article.id]).length - 1];
    return reviews[article.id][last];
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

  mapToMap() {
    const { mapReviews, reviews, article, initialReviews } = this.props;
    console.log(reviews);
    const newObj = {};
    let found = true;
    let i = 0;
    _.keys(reviews[article.id]).reverse().map(function (dataKey, index) {
      if (i === 5) found = false;
      if (found) {
        newObj[dataKey] = reviews[article.id][dataKey];
        i++;
      }
    });
    mapReviews(newObj, article.id);
    initialReviews(newObj, article.id);
  }

  addAReview(rating) {
    console.log(this.props);
    const { navigateTo, article } = this.props;
    console.log(rating);
    const route = {
      screen: ext('AddAReviewScreen'),
      props: {
        user: 'Billy',
        id: article.id,
        rating,
      },
    };
    navigateTo(route);
  }


  render() {
    const { imageUrl, title } = this.props.navigation.state.params;
    return (
      <Screen styleName="full-screen paper">
        <ScrollView>
          <GameBanner articleImage={imageUrl} title={title} />
          <GameStats lastReview={this.state.lastReview} rating={this.state.rating} />
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
  return {
    state
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Topic);