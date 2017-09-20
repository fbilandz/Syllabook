
import React, { Component } from 'react';
import {
  ActionSheetIOS,
  CameraRoll,
  ListView,
  StyleSheet,
  Navigator,
  Text,
  TouchableOpacity,
  View,
  Platform,
  AppRegistry,
} from 'react-native';

import PhotoBrowser from 'react-native-photo-browser';
import Gallery from 'react-native-image-gallery';
import { connect } from 'react-redux';
import _ from 'lodash';

export class ListOfPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      d: this.props.navigation.state.params,
    }
    this._onSelectionChanged = this._onSelectionChanged.bind(this);
    this._onActionButton = this._onActionButton.bind(this);

  }
  _onSelectionChanged(media, index, selected) {
    alert(`${media.photo} selection status: ${selected}`);
  }

  _onActionButton(media, index) {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showShareActionSheetWithOptions({
        url: media.photo,
        message: media.caption,
      },
        () => { },
        () => { });
    } else {
      alert(`handle sharing on android for ${media.photo}, index: ${index}`);
    }
  }

  render() {
    const urls = this.state.d.topic.urls;
    delete urls.newID.photo;
    var x = _.values(urls);
    return (
      <Gallery 
        images={x}
        style={{ flex: 1, backgroundColor: '#BFECCF' }}
      />
    );
  }
}
AppRegistry.registerComponent('ListOfPhotos', () => ListOfPhotos);

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(ListOfPhotos);