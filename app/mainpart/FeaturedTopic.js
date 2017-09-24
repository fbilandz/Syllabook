import React from 'react';
import {
  TouchableOpacity,
  Title,
  Caption,
  View,
  Tile,
  Image,
  Divider,
  Subtitle,
} from '@shoutem/ui';

import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
/**
 * A component used to render featured news articles
 */
export class FeaturedTopic extends React.Component {
  static propTypes = {
    onPress: React.PropTypes.func,
    articleId: React.PropTypes.string,
    title: React.PropTypes.string,
    author: React.PropTypes.string,
    imageUrl: React.PropTypes.string,
    date: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.onPress(this.props.articleId);
  }

  render() {
    const { title, imageUrl, date, author } = this.props;

    const momentDate = moment(date);
    const dateInfo = momentDate.isAfter(0) ? (
      <Caption styleName="md-gutter-left">
        {momentDate.fromNow()}
      </Caption>
    ) : null;
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View styleName="sm-gutter featured" style={{ backgroundColor: '#00802b', top: 0 }}>
          <Image
            styleName="featured placeholder"
            source={{ uri: imageUrl+'=s200' }}
          >
            <Tile>
              <Title>{(title || '').toUpperCase()}</Title>
              <View styleName="horizontal md-gutter-top" virtual>
                <Caption styleName="collapsible" numberOfLines={1}>{author}</Caption>
                <View style={{ flexDirection: 'row' }}>
                  <Subtitle>{this.props.rating === undefined ? 0.0 : this.props.rating.toFixed(1)} </Subtitle>
                  <Icon
                    name="star"
                    size={15}
                    color={'green'}
                  />
                </View>
                {dateInfo}
              </View>
            </Tile>
          </Image>
        </View>
        <Divider styleName="line" style={{ borderColor: "#565656" }} />
      </TouchableOpacity>
    );
  }
}