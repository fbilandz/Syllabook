
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
import { connect } from 'react-redux';
import _ from 'lodash';

export class ListOfPhotos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			d: this.props.navigation.state.params,
			data: {
				title: 'Multiple photos',
				description: 'with captions and nav arrows',
				displayNavArrows: true,
				displayActionButton: true,
				media: [{
					photo: 'https://c1.staticflickr.com/5/4195/34869630555_3f8554b403.jpg',
					selected: true,
					caption: 'Grotto of the Madonna',
				}, {
					photo: 'http://192.168.1.4:3500/uploads/AZEMRHUZ82Y0O4S5.jpg',
					thumb: 'http://192.168.1.4:3500/uploads/AZEMRHUZ82Y0O4S5.jpg',
					selected: false,
					caption: 'Beautiful Eyes',
				}],

			}
		}
		console.log(this.state.d);
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
		const { database } = this.props;
		console.log(database);
		const { grade, semester, subject, topic } = this.state.d;
		var x = _.values(database[grade][semester][subject][topic].urls);
		console.log(x);
		return (
			<PhotoBrowser
				onBack={navigator.pop}
				mediaList={x}
				displayNavArrows={this.state.data.displayNavArrows}
				displayActionButton={this.state.data.displayActionButton}
				useCircleProgress
				onSelectionChanged={this._onSelectionChanged}
				onActionButton={this._onActionButton}
			/>
		);
	}
}
AppRegistry.registerComponent('ListOfPhotos', () => ListOfPhotos);

const mapStateToProps = (state) => {
	return state;
}

export default connect(mapStateToProps)(ListOfPhotos);