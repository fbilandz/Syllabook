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
import { NavigationActions } from 'react-navigation';

export class AddASubject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.navigation.state.params,
            loaded: false,
            text: '',
        };
        //this.getDat1a = this.getData.bind(this);
        console.log(this.state.data);
        console.log(this.props.navigation.state.key);
    }
    componentDidMount() {
        this.setState({
            loaded: true
        })
    }
    
    addASubject(){
        const { unique_id, grade, semester } = this.state.data;
        const { text } = this.state;
        const backAction = NavigationActions.back({
            key: this.state.data.key
        })
        fetch('http://192.168.35.115:3500/api/subject',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'unique_id': unique_id,
                    'grade': grade,
                    'semester': semester,
                    'subject': text,
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    data: responseJson.data,
                })
                console.log(this.state);
                this.props.navigation.dispatch(backAction)
            })
            .catch((error) => {
                console.log(error);
            });

    }
    render() {
        return (
            <View style={styles.containerz}>
                <TextInput editable placeholder="Subject name" maxLength={50} style={{ width: 250 }} onChangeText={(text) => this.setState({ text: text })} />
                <Button title="Add a subject" onPress={() => this.addASubject()} buttonStyle={{ width: 230 }} backgroundColor="blue" />
            </View>
        );

    }
}
AppRegistry.registerComponent('AddASubject', () => AddASubject);