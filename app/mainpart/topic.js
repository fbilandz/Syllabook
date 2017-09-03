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
	RefreshControl
} from 'react-native';
import { Title, NavigationBar, Icon, Button, Spinner, ListView } from '@shoutem/ui';
import styles from '../components/style';
import Kartica from '../components/kartica';
import { List, ListItem } from 'react-native-elements';
import { Button as But } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';

export class TopicList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.navigation.state.params,
			loaded: false,
			images: [],
			refreshing: false,
			topics: this.props.navigation.state.params.topics,
		};
		//this.getData = this.getData.bind(this);
		this.pre = this.pre.bind(this);
		//this.pre();
	}
	componentDidMount() {
		this.setState({
			loaded: true
		})
	}

	_onRefresh() {
		this.setState({
			refreshing: true
		})
		fetch('http://192.168.35.115:3500/api/topics',
			{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					'unique_id': this.state.data.unique_id,
					'semester': this.state.data.semester,
					'grade': this.state.data.grade,
					'subject': this.state.data.subject,
				})
			})
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
				this.setState({
					topics: responseJson,
					refreshing: false
				})
				console.log(this.state);
			})
			.catch((error) => {
				console.log(error);
			});

	}
	pre() {
		var images = this.state.images;
		var data = this.state.data;
		for (var i = 0; i < data.length; i++) {
			console.log(data[i])
			var prefetchImage = Image.prefetch(data[i].photo);

			images.push(prefetchImage);

			console.log(images);
		}
		this.setState({
			images: images,
		})
	}
	/*renderRow(data, rowId) {
			console.log(data, rowId);
			return (
					<Button onPress={() => Actions.images()}>
							<View style={{ height: 280, width: 250, borderRadius: 15, alignContent: 'center' }}>
									<Image source={{ uri: data.photo }} style={{ height: 250, width: 250 }} />
									<Title>{data.topic}</Title>
							</View>
					</Button>
			);
	}*/
	goToImages = (data) => {
		
		this.props.navigation.navigate('Images', { topic: data, grade: this.state.data.grade, semester: this.state.data.semester, subject: this.state.data.subject });
	}
	goToPhoto = (item) => {
		console.log(item);
		this.props.navigation.navigate('Photo', { unique_id: this.state.data.unique_id, topic: item, grade: this.state.data.grade, semester: this.state.data.semester, subject: this.state.data.subject, nova: false })
	}
	addATopic = () => {
		this.props.navigation.navigate('AddATopic', { key: this.props.navigation.state.key, unique_id: this.state.data.unique_id, grade: this.state.data.grade, semester: this.state.data.semester, subject: this.state.data.subject })
	}
	render() {
		const { database } = this.props;
		const { grade, semester, subject } = this.state.data;
		var x = database[grade][semester][subject];
		var y = _.keys(database[grade][semester][subject]);
		if (y.length > 0 && x.value !== 0) {
			return (
				<ScrollView refreshControl={
					<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={this._onRefresh.bind(this)}
					/>}>
					<View style={styles.containerz}>
						<But buttonStyle={{ width: 300 }} title="Add a topic" backgroundColor="red" onPress={this.addATopic} />
						<List>
							{
								y.map((item, i) => (
									item !== "value" ?
										<View key={i}>
											<Button onPress={() => this.goToImages(item)}>
												<View style={{ height: 280, width: 250, borderRadius: 15, alignContent: 'center' }}>
													<Image source={{ uri: x[item].urls.newID.photo }} style={{ height: 250, width: 250 }} />
													<Title>{x[item].title}</Title>
												</View>
											</Button>
											<But buttonStyle={{ height: 25 }} backgroundColor="#34AE4F" onPress={() => this.goToPhoto(item)} title="Add to topic" />
										</View> : null
								))
							}
						</List>
					</View>
				</ScrollView>
			);
		} else {
			return (
				<ScrollView contentContainerStyle={{ height: 600 }}
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this._onRefresh.bind(this)}
						/>}>
					<View style={styles.containerz}>
						<Text>No available topics</Text>
						<But buttonStyle={{ width: 300 }} title="Add a topic" backgroundColor="red" onPress={this.addATopic} />
					</View>
				</ScrollView>
			);
		}
	}
}
AppRegistry.registerComponent('TopicList', () => TopicList);

const mapStateToProps = (state) => {
	console.log(state);
	return state;
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TopicList);