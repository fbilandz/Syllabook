/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image
} from 'react-native';
import Camera from 'react-native-camera';
import { Icon, Button } from '@shoutem/ui';
import { NavigationActions } from 'react-navigation'

const PicturePath = "";

export class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taken: false,
            data: this.props.navigation.state.params,
        }


        console.log(this.state.data);
    }
    takePicture() {
        this.camera.capture()
            .then((data) => {
                console.log(data);
                PicturePath = data.path;
                this.setState({
                    taken: true,
                })
            })
            .catch(err => console.error(err));
    }
    storePicture() {
        const { grade, semester, subject, unique_id, topic, nova } = this.state.data;
        const backAction = NavigationActions.back({
            key: this.state.data.key
        })
        var xhr = new XMLHttpRequest();
        console.log(PicturePath);
        if (PicturePath) {
            var photo = {
                uri: PicturePath,
                type: 'image/jpeg',
                name: 'photo.jpg',
            };

            var body = new FormData();
            body.append('grade', grade);
            body.append('unique_id', unique_id);
            body.append('topic', topic);
            body.append('subject', subject);
            body.append('semester', semester);
            body.append('photo', photo);
            //body.append('title', 'A beautiful photo!');
            body.append('nova', nova)
            xhr.open('POST', "http://192.168.35.115:3500/api/images");
            xhr.send(body);
            this.setState({
                taken: false,
            });
            if (nova) this.props.navigation.dispatch(backAction);
        }
    }
    render() {
        if (!this.state.taken) {
            return (
                <View style={styles.container}>
                    <Camera
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        style={styles.preview}
                        aspect={Camera.constants.Aspect.fill}
                        captureTarget={Camera.constants.CaptureTarget.disk}
                        captureQuality={Camera.constants.CaptureQuality["1080p"]}>
                        <Button style={styles.capture} onPress={this.takePicture.bind(this)}><Icon name="photo" /></Button>
                    </Camera>
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Image
                        source={{ uri: PicturePath, isStatic: true }} style={styles.preview}
                    ><Button style={styles.capture} onPress={this.storePicture.bind(this)}><Icon name="share" /></Button>
                    </Image>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});

AppRegistry.registerComponent('Photo', () => Photo);