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
    RefreshControl
} from 'react-native';
import { Title, NavigationBar, Icon, Button, Spinner, ListView } from '@shoutem/ui';
import styles from '../components/style';
import Kartica from '../components/kartica';
import { List, ListItem } from 'react-native-elements';
import { Button as But } from 'react-native-elements';

export class Images extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.navigation.state.params,
            loaded: false,
            images: [],
            refreshing: false,
            topics: this.props.navigation.state.params.photos,
        };
        //this.getData = this.getData.bind(this);
        this.pre = this.pre.bind(this);
        console.log(this.state.data)
        //this.pre();
    }
    componentDidMount() {
        this.setState({
            loaded: true
        })
    }

    _onRefresh() {
        this.setState({
            refreshing: true
        })
        fetch('http://192.168.1.4:3500/api/topics',
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
                    'subject': this.state.data.subject,
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    topics: responseJson,
                    refreshing: false
                })
                console.log(this.state);
            })
            .catch((error) => {
                console.log(error);
            });

    }
    pre() {
        var images = this.state.images;
        var data = this.state.data;
        for (var i = 0; i < data.length; i++) {
            console.log(data[i])
            var prefetchImage = Image.prefetch(data[i].photo);

            images.push(prefetchImage);

            console.log(images);
        }
        this.setState({
            images: images,
        })
    }
    /*renderRow(data, rowId) {
        console.log(data, rowId);
        return (
            <Button onPress={() => Actions.images()}>
                <View style={{ height: 280, width: 250, borderRadius: 15, alignContent: 'center' }}>
                    <Image source={{ uri: data.photo }} style={{ height: 250, width: 250 }} />
                    <Title>{data.topic}</Title>
                </View>
            </Button>
        );
    }*/
    goToImages = (data) => {
        this.props.navigation.navigate('Images', [...data.photos])
    }
    deleteTopic = (item) => {

        fetch('http://192.168.1.4:3500/api/deletePhoto',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    unique_id: this.state.data.unique_id,
                    topic: item.topic,
                    grade: this.state.data.grade,
                    semester: this.state.data.semester,
                    subject: this.state.data.subject,
                    link: item.photo,
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this._onRefresh();
                console.log(this.state);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    addATopic = () => {
        this.props.navigation.navigate('AddATopic', { key: this.props.navigation.state.key, unique_id: this.state.data.unique_id, grade: this.state.data.grade, semester: this.state.data.semester, subject: this.state.data.subject })
    }
    render() {
        
            return (
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />}>
                    <View style={styles.containerz}>
                        <List>
                            {
                                this.state.data.map((item, i) => (
                                    <View key={i} style={{ height: 280, width: 250}}>

                                        <Image source={{ uri: item.photo }} style={{ height: 250, width: 250 }} />

                                        <But buttonStyle={{ height: 25 }} backgroundColor="red" onPress={() => this.deleteTopic(item)} title="Delete a photo" />
                                    </View>
                                ))
                            }
                        </List>
                    </View>
                </ScrollView>
            );
        
    }
}
AppRegistry.registerComponent('Images', () => Images);