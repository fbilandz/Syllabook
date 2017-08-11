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
import _ from 'lodash';

export class ListOfSubjects extends Component {
	constructor(props) {
		super(props);
		console.log(this.props);
		this.state = {
			data: this.props.navigation.state.params,
			loaded: false,
			subjects: this.props.navigation.state.params.subjects,
			refreshing: false,
		};
		//this.getData = this.getData.bind(this);
		this.initialStart = this.initialStart.bind(this);
		//this.initialStart();
		console.log(this.state.data);
	}
	componentDidMount() {
		console.log("subjects")
		this.setState({
			loaded: true
		})
	}
	initialStart() {
		fetch('http://192.168.35.115:3500/api/subjects',
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
				})
			})
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
				this.setState({
					subjects: responseJson.subjects,
					//refreshing: false,
				})
				console.log(this.state);
			})
			.catch((error) => {
				console.log(error);
			})
	}
	_onRefresh() {
		this.setState({
			refreshing: true,
		})
		fetch('http://192.168.35.115:3500/api/subjects',
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
				})
			})
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
				this.setState({
					subjects: responseJson.subjects,
					refreshing: false,
				})
				console.log(this.state);
			})
			.catch((error) => {
				console.log(error);
			})
	}
	goToTopics = (data) => {
		this.props.navigation.navigate('Topics', { grade: this.state.data.grade, semester: this.state.data.semester, subject: data })
	}
	addASubject = () => {
		this.props.navigation.navigate('AddASubject', { grade: this.state.data.grade, semester: this.state.data.semester, unique_id: this.state.data.unique_id, })
	}
	renderRow(data, rowId) {
		console.log(data);
		return (
			<View style={styles.card}>
				<Button onPress={() => this.goToTopics(data.topics)}><Text style={styles.textz}>{data.subject}</Text></Button>
			</View>

		);
	}
	render() {
        console.log(this.props.database)
        const { database } = this.props;
        const x = _.keys(database[this.state.data.grade][this.state.data.semester])
        console.log(x);
		if (x.length > 0) {
			return (
				<ScrollView contentContainerStyle={{ backgroundColor: '#ffffff', minHeight: Dimensions.get('screen').height * 0.8 }}
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this._onRefresh.bind(this)}
						/>}
				>

					<View style={styles.containerz}>

						<List>
							{
								x.map((item, i) => (
									<Button
										key={i}
										raised
										buttonStyle={{ width: 320, marginVertical: 15, }}
										title={item}
										backgroundColor="#34AE4F"
										onPress={() => this.goToTopics(item)}

									/>
								))
							}
							<Button
								raised
								buttonStyle={{ width: 320, marginVertical: 15, }}
								title="Add a subject"
								backgroundColor="red"
								onPress={() => this.addASubject()}

							/>
						</List>
					</View>
				</ScrollView>
			);
		} else {
			return (
				<ScrollView contentContainerStyle={{ backgroundColor: '#ffffff', minHeight: Dimensions.get('screen').height * 0.8 }}
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this._onRefresh.bind(this)}
						/>} >
					<View style={styles.containerz}>
						<Text>No available subjects</Text>
						<Button buttonStyle={{ width: 300 }} title="Add a subject" backgroundColor="red" onPress={this.addASubject} />
					</View>
				</ScrollView>
			);
		}
	}
}
AppRegistry.registerComponent('ListOfSubjects', () => ListOfSubjects);

const mapStateToProps = (state, ownProps) => {
    console.log(state, ownProps);;
    return state;
}
const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(ListOfSubjects);