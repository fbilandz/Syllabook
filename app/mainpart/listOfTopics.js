import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	Alert,
	TextInput,
	TouchableOpacity,
	Platform,
	ScrollView,
	RefreshControl,
	Dimensions
} from 'react-native';
import { Title, NavigationBar, Icon, Spinner, ListView } from '@shoutem/ui';
import styles from '../components/style';
import Kartica from '../components/kartica';
import { List, ListItem, Button } from 'react-native-elements';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';

export class ListOfTopics extends Component {
	static propTypes = {
		data: React.PropTypes.array
	};

	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data,
			loaded: false,
			admin: this.props.admin,
		};
		this.getData = this.getData.bind(this);
	}
	componentDidMount() {
		this.setState({
			loaded: true
		})
	}

	getData() {
		const { user } = this.state;
		if (this.state.loaded) {
			this.setState({
				loaded: false,
			})
		}
		fetch('http://192.168.1.12:3500/grades',
			{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					'username': user,
				})
			})
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
				this.setState({
					loaded: true,
					data: responseJson.data,
				})
				console.log(this.state);
			})
			.catch((error) => {
				console.log(error);
			});

	}
	renderRow(data, rowId) {
		console.log(data);
		return (
			<View style={styles.card}>
				<Button onPress={() => Actions.view({ data: data.topics })}><Text style={styles.textz}>{data.topic}</Text></Button>
			</View>
		);
	}
	render() {
		return (
			<View style={styles.containerz}>

				<ListView
					data={this.state.data}
					loading={!this.state.loaded}
					renderRow={this.renderRow}
					onRefresh={this.getData.bind(this)}
				/>

			</View>
		);

	}
}
AppRegistry.registerComponent('ListOfTopics', () => ListOfTopics);