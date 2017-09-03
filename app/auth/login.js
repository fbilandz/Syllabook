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
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../components/style';
import { Register } from './register';
import { CreateNewGroup } from './createNewGroup';
import { Handle } from '../handle';
import { Spinner } from '../components/spinner';
import { NavigationActions } from 'react-navigation';
import firebase from '../firebase/firebase';
import _ from 'lodash';
import { addEmail } from '../redux/actions';
import { connect } from 'react-redux';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register: false,
      login: true,
      logged: false,
      pl: Platform.OS === 'ios' ? '\n' : '',
      email: '',
      pass: '',
      username: '',
      loaded: true,
      posao: '',
      unique_id: '',
      active: false,
      spin: true,
    };
    this.checkForAuth = this.checkForAuth.bind(this);
  }
  componentDidMount() {
    setTimeout(this.checkForAuth.bind(this), 75);
  }
  checkForAuth() {
    if (firebase.auth().authenticated) {
      this.props.addEmail(firebase.auth().currentUser.email);
      this.goToNormal(firebase.auth().currentUser.email);
    }
    this.setState({
      spin: false,
    })
  }
  goToAdmin = (params) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'Admin', params }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  goToNormal = (params) => {    
    let resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'HandleR', params: { email: params } }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  send = () => {
    console.log(this.props);

    this.setState({
      loaded: false,
      active: true,
    });
    const { email, pass } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, pass)
      .then((user) => {
        console.log('User successfully logged in', user);
        this.getUniqueIds(email);
      })
      .catch((err) => {
        console.error('User signin error', err);
      });
    // this.goToAdmin();
  }
  render() {
    
    if (this.state.spin) {
      return <ActivityIndicator
        animating={this.state.spin}
        //style={[styles.centering, { height: 80 }]}
        size="large"
      />
    } else {
      if (this.state.logged) {
        return <Handle screenProps={this.state.data} />;
      }
      else if (this.state.login) {
        return (
          <View style={styles.container}>
            <View style={styles.textInputContainer}>
              <TextInput
                editable
                maxLength={64}
                autoCapitalize="none"
                placeholder="email"
                style={styles.textinput}
                onChangeText={(email) => this.setState({ email })}
              />
              <Text>{this.state.pl}</Text>
              <TextInput
                editable
                maxLength={16}
                autoCapitalize="none"
                placeholder="password"
                style={styles.textinput}
                secureTextEntry
                onChangeText={(pass) => { this.setState({ pass }); }}
              />
              <Text>{"\n"}</Text>
            </View>
            <Spinner
              send={this.send}
              buttonStyle={{ width: 240, backgroundColor: 'orange' }}
              title="Login"
              active={this.state.active}
            />
            <TouchableHighlight onPress={() => this.setState({ login: false, register: true })} >
              <Text style={{ color: 'blue', marginVertical: 15 }}>Register</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.setState({ login: false, create: true })} >
              <Text style={{ color: 'blue', marginVertical: 15 }}>Create New Group</Text>
            </TouchableHighlight>
          </View>
        );
      }
      else if (this.state.register) {
        return <Register />;
      }
      return <CreateNewGroup />;
    }
  }

}


AppRegistry.registerComponent('Login', () => Login);

const mapDispatchToProps = {
  addEmail,
}

export default connect(null, mapDispatchToProps)(Login);