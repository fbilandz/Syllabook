
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
  Animated,
  TouchableHighlight
} from 'react-native';
import styles from '../components/style';
import { Button } from 'react-native-elements';
import { Login } from './login';
import { CreateNewGroup } from './createNewGroup';
import firebase from '../firebase/firebase';

export class SorT extends Component {
  static propTypes = {
    loaded: React.PropTypes.bool,
  };
  render() {
    if (this.props.loaded) return <Text style={styles.textR}>Register</Text>
    else return <Spinner style={{ backgroundColor: "white" }} />
  }
}

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register: true,
      user: '',
      pass: '',
      passs: '',
      email: '',
      unique_id: '',
      pl: Platform.OS === "ios" ? "\n" : "",
      message: "\n",
      loaded: true,
      rIliP: '',
    }
    console.log(this.state);
  }
  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    return re.test(email);
  };
  validatePass = (pass) => {
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.*[0-9])(?=.{8,})/;
    return re.test(pass);
  };
  check() {
    if (!this.validateEmail(this.state.email)) {
      Alert.alert("Invalid email")
      return false;
    }
    if (!this.validatePass(this.state.pass)) {
      Alert.alert("Password not valid");
      return false;
    }
    if (!this.state.user.length >= 6) {
      Alert.alert("Username has to be at least 6 characters long");
      return false;
    }
    if (this.state.pass != this.state.passs) {
      Alert.alert("Passwords don't match");
      return false;
    }
    return true;
  }
  toDB(uniqueid, email) {
    firebase.database().ref('users/' + uniqueid).push({
      email,
    }, (err) => console.log(err));
  }
  addUserToDB(uniqueid, user) {
    let f = false;
    firebase.database().ref('users').orderByKey().equalTo(uniqueid).on("value", (snapshot) => {
      console.log(snapshot.val());
      if (snapshot.val() !== null && !f) {
        this.toDB(uniqueid, user);
        f = true;
      }
    });
  }
  send() {
    if (this.check()) {
      this.setState({
        loaded: false
      })
      const { user, pass, email, unique_id } = this.state;
      firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then((user) => {
          console.log('user created', user);
          this.setState({ loaded: true });
          this.addUserToDB(unique_id, email);
        })
        .catch((err) => {
          console.error('An error occurred', err);
        });
    }
  }

  render() {
    if (this.state.register) {
      return (
        <View style={styles.container}>

          <View style={styles.textInputContainer}>
            <TextInput
              editable
              maxLength={32}
              placeholder="email"
              style={styles.textinput}
              keyboardType="email-address"
              onChangeText={(email) => { this.setState({ email }); }}
              autoCapitalize="none" />
            <Text>{this.state.pl}</Text>
            <TextInput
              editable
              maxLength={16}
              placeholder="password"
              style={styles.textinput}
              secureTextEntry
              onChangeText={(pass) => { this.setState({ pass }); }}
              autoCapitalize="none"
            />
            <Text>{this.state.pl}</Text>
            <TextInput
              editable
              maxLength={16}
              placeholder="confirm password"
              style={styles.textinput}
              secureTextEntry
              onChangeText={(passs) => { this.setState({ passs }); }}
              autoCapitalize="none" />
            <TextInput
              editable
              maxLength={32}
              placeholder="unique id"
              style={styles.textinput}
              onChangeText={(unique_id) => { this.setState({ unique_id }); }}
              autoCapitalize="none"
            />
          </View>
          <Button onPress={this.send.bind(this)} title="Register" buttonStyle={{ width: 230, backgroundColor: 'green' }} />
          <TouchableHighlight onPress={() => this.setState({ register: false, login: true })}><Text style={{ color: 'blue', marginVertical: 15 }}>Login</Text></TouchableHighlight>
          <TouchableHighlight onPress={() => this.setState({ register: false, create: true })} ><Text style={{ color: 'blue', marginVertical: 15 }}>Create New Group</Text></TouchableHighlight>
        </View>

      );
    }
    else if (this.state.login) {
      return <Login />;
    }
    return <CreateNewGroup />;
  }
}


AppRegistry.registerComponent('Register', () => Register);
