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
} from 'react-native';
import { Title, NavigationBar, Icon, Spinner, ListView } from '@shoutem/ui';
import styles from '../components/style';
import { List, ListItem } from 'react-native-elements';
import { Button } from 'react-native-elements';

export class AddATopic extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.state.params,
      loaded: false,
      text: '',
    };
    this.getData = this.getData.bind(this);
    console.log(this.state.data);
    console.log(this.props.navigation.state.key);
  }
  componentDidMount() {
    this.setState({
      loaded: true
    })
  }
  goToPhoto = () => {
    this.props.navigation.navigate('Photo', { unique_id: this.state.data.unique_id, topic: this.state.text, grade: this.state.data.grade, semester: this.state.data.semester, subject: this.state.data.subject, nova: true, key: this.props.navigation.state.key })
  }
  render() {
    return (
      <View style={styles.containerz}>
        <TextInput editable placeholder="Topic name" maxLength={50} style={{ width: 250 }} onChangeText={(text) => this.setState({ text: text })} />
        <Button title="Take inital photo" onPress={() => this.goToPhoto()} buttonStyle={{ width: 230 }} backgroundColor="blue" />
      </View>
    );

  }
}
AppRegistry.registerComponent('AddATopic', () => AddATopic);