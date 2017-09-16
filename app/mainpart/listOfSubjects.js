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
      refreshing: false,
    };
  }
  componentDidMount() {
    console.log("subjects")
    this.setState({
      loaded: true
    })
  }
  goToTopics = (data) => {
    this.props.navigation.navigate('Topics', { grade: this.state.data.grade, semester: this.state.data.semester, subject: data })
  }
  addASubject = () => {
    this.props.navigation.navigate('AddASubject', { grade: this.state.data.grade, semester: this.state.data.semester, })
  }
  render() {
    const { database } = this.props;
    const x = _.keys(database[this.state.data.grade][this.state.data.semester])
    if (x.length > 0) {
      return (
        <ScrollView contentContainerStyle={{ backgroundColor: '#ffffff', minHeight: Dimensions.get('screen').height * 0.8 }}
        >
          <View style={styles.containerz}>
            <List containerStyle={{ marginTop: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0, borderLeftWidth: 0 }}>
              {
                x.map((item, i) => (
                  item !== "value" ?
                    <Button
                      key={i}
                      buttonStyle={{ width: 320, marginVertical: 15, }}
                      title={item}
                      backgroundColor="#34AE4F"
                      onPress={() => this.goToTopics(item)}
                    />
                    :
                    null
                ))
              }
              <Button
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
        <ScrollView contentContainerStyle={{ backgroundColor: '#ffffff', minHeight: Dimensions.get('screen').height * 0.8 }}>
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
  return { database: state.database };
}
const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(ListOfSubjects);