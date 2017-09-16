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
import { Title, NavigationBar, Icon, Button, Spinner, ListView } from '@shoutem/ui';
import styles from '../components/style';
import Kartica from '../components/kartica';
import { List, ListItem } from 'react-native-elements';
import { Button as But } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import firebase from '../firebase/firebase';
import { FeaturedTopic } from './FeaturedTopic';
import { ListTopic } from './ListTopic';

export class TopicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.state.params,
      loaded: false,
      images: [],
      refreshing: false,
      topics: this.props.navigation.state.params.topics,
      admin: this.props.uniqueID.admin,
    };
    //this.getData = this.getData.bind(this);
    //this.pre();
    this.deleteTopic = this.deleteTopic.bind(this);
    this.goToTopic = this.goToTopic.bind(this);
  }
  componentDidMount() {
    this.setState({
      loaded: true
    });
  }

  deleteTopic = (topic) => {
    const { uniqueID } = this.props;
    const { unique_id, grade, subject, semester } = this.state.data;
    firebase.database()
      .ref(`topics/${uniqueID.id}/${grade}/${semester}/${subject}/${topic}`)
      .remove((err) => console.log(err));
  }
  goToImages = (data) => {
    this.props.navigation.navigate('Images', { topic: data, grade: this.state.data.grade, semester: this.state.data.semester, subject: this.state.data.subject });
  }
  goToTopic = (data) => {
    this.props.navigation.navigate('Topic', { topic: data.topic, imageUrl: data.imageUrl, title: data.title, unique_id: this.state.data.unique_id, grade: this.state.data.grade, semester: this.state.data.semester, subject: this.state.data.subject });
  }
  goToPhoto = (item) => {
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
    var width = Dimensions.get("window").width;
    if (y.length > 0 && x.value !== 0) {
      var index = y.indexOf("value");
      y.splice(index, 1)
      var s = y.shift();
      return (
        <ScrollView contentContainerStyle={{ top: 0, }}>
          <List containerStyle={{ marginTop: 0, borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FeaturedTopic
              title={x[s].title}
              imageUrl={x[s].urls.newID.photo}
              onPress={() => this.goToTopic({ imageUrl: x[s].urls.newID.photo, title: x[s].title, topic: s })}
            />
            {
              y.map((item, i) => (
                item !== "value" ?
                  <ListTopic
                    key={i}
                    imageUrl={x[item].urls.newID.photo}
                    title={x[item].title}
                    onPress={() => this.goToTopic({ imageUrl: x[item].urls.newID.photo, title: x[item].title, topic: item })}
                  />
                  : null
              ))
            }
          </List>
        </ScrollView >
      );
    } else {
      return (
        <ScrollView contentContainerStyle={{ height: 600 }}>
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
  return state;
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TopicList);