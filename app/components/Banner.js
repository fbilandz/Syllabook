import React from 'react';
import {
  Title,
  Caption,
  Icon,
  Tile,
  Image,
  View,
} from '@shoutem/ui';
import moment from 'moment';
import { connect } from 'react-redux';

export class GameBanner extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Image
        styleName="large-banner placeholder"
        source={{ uri: this.props.articleImage}}
        animationName="hero"
      >
        <Tile animationName="hero">
          <View styleName="horizontal md-gutter-top" virtual>{}
            <Caption styleName="collapsible" numberOfLines={1}>{this.props.newsAuthor}</Caption>
            <Caption styleName="md-gutter-left">
              {moment(this.props.timeUpdated).fromNow()}
            </Caption>
          </View>
        </Tile>
        <Icon name="down-arrow" styleName="scroll-indicator" />
      </Image>
    );
  }
}
