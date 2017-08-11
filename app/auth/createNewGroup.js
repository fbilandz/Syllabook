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
import DropDown, {
    Select,
    Option,
    OptionList,
} from 'react-native-selectme';
import { Login } from './login';

export class CreateNewGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            username: '',
            password: '',
            confirm: '',
            email: '',
            grades: '',
            made: false
        };
        this.createNewGroup = this.createNewGroup.bind(this);
        console.log(this.state);
        //console.log(this.props.navigation.state.key);
    }
    componentDidMount() {
        this.setState({
            loaded: true,
        })
    }

    createNewGroup() {
        const { username, password, grades, email, confirm } = this.state;
        if (password == confirm)
            fetch('http://192.168.35.115:3500/api/group',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'grades': parseInt(grades),
                        'email': email,
                        'username': username,
                        'password': password
                    })
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.setState({
                        loaded: true,
                        data: responseJson.data,
                        //made: true,
                    })
                    console.log(this.state);
                    Alert.alert("Your group's unique id is" + "\n" + this.state.data.unique_id);
                    this.setState({
                        made: true
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
        else
            Alert.alert("Passwords don't match")
    }
    _getOptionList() {
        return this.refs['OPTIONLIST'];
    }
    grades(grade) {
        this.setState({
            grades: grade,
        })
    }
    goToPhoto = () => {
        this.props.navigation.navigate('Photo', { unique_id: this.state.data.unique_id, topic: this.state.text, grade: this.state.data.grade, semester: this.state.data.semester, subject: this.state.data.subject, nova: true, key: this.props.navigation.state.key })
    }
    render() {
        if (!this.state.made)
            return (
                <View style={styles.containerz}>
                    <TextInput editable placeholder="username" maxLength={32} style={{ width: 250, marginBottom: 15, fontSize: 18 }} onChangeText={(username) => this.setState({ username: username })} />
                    <TextInput editable placeholder="email" maxLength={50} style={{ width: 250, marginBottom: 15, fontSize: 18 }} onChangeText={(email) => this.setState({ email: email })} />
                    <TextInput editable secureTextEntry placeholder="password" maxLength={20} style={{ width: 250, marginBottom: 15, fontSize: 18 }} onChangeText={(password) => this.setState({ password: password })} />
                    <TextInput editable secureTextEntry placeholder="confirm password" maxLength={20} style={{ width: 250, marginBottom: 15, fontSize: 18 }} onChangeText={(confirm) => this.setState({ confirm: confirm })} />
                    <Select
                        width={240}
                        ref="SELECT1"
                        optionListRef={this._getOptionList.bind(this)}
                        defaultValue="No. of grades"
                        onSelect={this.grades.bind(this)}>
                        <Option>1</Option>
                        <Option>2</Option>
                        <Option>3</Option>
                        <Option>4</Option>
                        <Option>5</Option>
                        <Option>6</Option>
                        <Option>7</Option>
                        <Option>8</Option>
                        <Option>9</Option>
                    </Select>
                    <Button title="Create new group" onPress={this.createNewGroup} buttonStyle={{ width: 230, marginTop: 10 }} backgroundColor="blue" />
                    <OptionList ref="OPTIONLIST" />
                </View>
            );
        else
            return <Login />

    }
}
AppRegistry.registerComponent('CreateNewGroup', () => CreateNewGroup);