import React from 'react';
import { connectStyle } from '@shoutem/theme';
import {
  Title,
  Subtitle,
  View,
  Divider,
  Html,
} from '@shoutem/ui';
import moment from 'moment';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

export class GameStats extends React.PureComponent {
  render() {
    return (
      <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
        <View styleName="horizontal space-between">
          <View styleName="horizontal" style={{ alignSelf: 'center' }}>
            <Title>Rating: </Title>
            <Title>{this.props.rating === undefined ? 0.0 : this.props.rating.toFixed(1)} </Title>
            <Icon
              name="star"
              size={26}
              color={'#fdbc50'}
            />
          </View>

          <View styleName="md-gutter-right">
            <Title>Last review : </Title>
            <Subtitle>
              {
                this.props.lastReview === undefined ?
                  null
                  :
                  moment(this.props.lastReview.timeStamp).fromNow()
              }
            </Subtitle>
          </View>
        </View>
        <Divider styleName="line" />
        <Title styleName="h-center">About</Title>
        <Html body={this.props.description} />
      </View>
    );
  }
}
