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
import firebase from '../firebase/firebase';
import { addData, uniqueId, tokenId, admin } from '../redux/actions';
import _ from 'lodash';

export class ListOfGrades extends Component {
	constructor(props) {
		super(props);
		console.log(this.props)
		this.state = {
			//data: this.props.screenProps,
			loaded: false,
			ok: false,
		}
		console.log("svasta");
		console.log(this.props.navigation.state.params);
		/*let data = this.state.data;
		for(var i = 0; i<data.length; i++){
				console.log(data[i]);
				data[i].props = this.props
		}
		this.setState({
				data: data,
		})*/
		//this.goToSemesters = this.goToSemesters.bind(this)
		//this.getData = this.getData.bind(this);
		this.getUniqueId = this.getUniqueId.bind(this);
	}
	componentDidMount() {
		this.getUniqueId(this.props.email);
		this.getToken();
	}
	getToken() {
		const { tokenId } = this.props;
		firebase.messaging().getToken()
			.then((token) => {
				console.log('Device FCM Token: ', token);
				tokenId(token);

			});
	}
	subscrub() {
		const { uniqueID } = this.props;
		console.log(uniqueID.id);
		firebase.messaging().WILL_PRESENT_RESULT;
		firebase.messaging().subscribeToTopic(uniqueID.id);
		firebase.messaging().onMessage((message) => {
			console.log(message);
		});
	}
	getUniqueId(email) {
		console.log(email);
		fetch('https://us-central1-svercbook.cloudfunctions.net/api/findUniqueId', {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email
			}),
		})
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
				this.props.uniqueId(responseJson.uniqueId);
				this.props.admin(responseJson.admin);
				this.getDB();
			})
			.catch((err) => console.error(err));
	}
	getDB() {
		const key = this.props.uniqueID.id;
		console.log(key)
		var ref = firebase.database().ref('topics/' + key);
		ref.on("value", this.handlePostUpdate);
	}
	handlePostUpdate = (snapshot) => {
		console.log('Post Content', snapshot.val());
		this.props.addData(snapshot.val());
		this.setState({
			loaded: true,
		})
	}
	goToSemesters = (data) => {
		console.log(data);
		this.props.navigation.navigate('Semesters', { grade: data });
	}
	/*renderRow(data) {
			console.log(data.grade, data.props, data.semesters);
			return (
					<View style={styles.card}>
							<Button onPress={() => data.props.navigation.navigate('Semesters', {data: data.semesters})}><Text style={styles.text}>{data.grade}</Text></Button>
					</View>
			);
	}*/
	render() {
		console.log(this.props);
		const { database } = this.props;
		let x = _.keys(database);
		console.log(x);
		if (x.length > 0 || !this.state.loaded)
			return (
				<View style={styles.containerz}>
					<List>
						{
							x.map((item, i) => (
								<Button
									raised
									key={i}
									buttonStyle={{ width: 320, marginVertical: 15, }}
									title={item}
									backgroundColor="#34AE4F"
									onPress={() => this.goToSemesters(item)}
								/>
							))
						}
					</List>
				</View>
			);
		else
			return (
				<View style={styles.container}>
					<Text>Nema razreda</Text>
				</View>
			)
	}
}
AppRegistry.registerComponent('ListOfGrades', () => ListOfGrades);

const mapStateToProps = (state) => {
	console.log(state);
	return state;
}
const mapDispatchToProps = {
	addData,
	uniqueId,
	tokenId,
	admin,
}
export default connect(mapStateToProps, mapDispatchToProps)(ListOfGrades);
