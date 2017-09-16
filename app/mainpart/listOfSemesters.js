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
import { addData } from '../redux/actions';
import _ from 'lodash';

export class ListOfSemesters extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.state.params,
      loaded: false,
    };
    this.getData = this.getData.bind(this);
    console.log("semesters");
    console.log(this.state.data);
  }
  componentDidMount() {
    this.setState({
      loaded: true,
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
  goToSubjects = (data) => {
    console.log(data);
    this.props.navigation.navigate('Subjects', { semester: data, grade: this.state.data.grade })
  }

	/*renderRow(data, rowId) {
			console.log(data);
			return (

					<View style={styles.card}>
							<Button onPress={() => this.goToSubjects(data.subjects)}><Text style={styles.text}>{data.semester}</Text></Button>
					</View>
			);
	}*/
  render() {
    console.log(this.props);
    const { database } = this.props
    const x = _.keys(database[this.state.data.grade]);
    return (
      <View style={styles.containerz}>
        <List containerStyle={{ marginTop: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0, borderLeftWidth: 0 }}>
          {
            x.map((item, i) => (
              <Button
                key={i}
                buttonStyle={{ width: 320, marginVertical: 15, }}
                title={item}
                backgroundColor="#34AE4F"
                onPress={() => this.goToSubjects(item)}

              />
            ))
          }
        </List>
      </View>
    );

  }
}
AppRegistry.registerComponent('ListOfSemesters', () => ListOfSemesters);

const mapStateToProps = (state, ownProps) => {
  console.log(state, ownProps);
  return state;
}
const mapDispatchToProps = {
  addData,
}
export default connect(mapStateToProps, mapDispatchToProps)(ListOfSemesters);