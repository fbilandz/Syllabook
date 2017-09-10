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
import { connect } from 'react-redux';
import firebase from '../firebase/firebase';
import UUIDGenerator from 'react-native-uuid-generator';
import moment from 'moment';
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
    console.log(PicturePath);
    const { grade, semester, subject, topic, nova } = this.state.data;
    const { uniqueID } = this.props;
    const backAction = NavigationActions.back({
      key: this.state.data.key
    })
    let x;
    UUIDGenerator.getRandomUUID().then((uuid) => {
      console.log(uuid);
      x = uuid;
      const metadata = {
        contentType: 'image/jpeg'
      }
      console.log(x);
      firebase.storage()
        .ref(x + '.jpg')
        .putFile(PicturePath, metadata)
        .then((uploadedFile) => {
          let l;
          console.log(uploadedFile);
          l = uploadedFile.downloadUrl;
          while (typeof l !== 'string');
          if (nova) {
            firebase.database().ref(`topics/${uniqueID.id}/${grade}/${semester}/${subject}`)
              .push({
                title: topic,
                author: "NOIDEA",
                timestamp: moment(),
                urls: {
                  newID: {
                    photo: l,
                  }
                }
              },
              (err) => {
                console.log(err);
                l = true;
                firebase.database().ref(`topics/${uniqueID.id}/${grade}/${semester}/${subject}`)
                  .update({ value: 1 })
              });
          } else {
            const { topic } = this.state.data;
            firebase.database().ref(`topics/${uniqueID.id}/${grade}/${semester}/${subject}/${topic}/urls`)
              .push({
                photo: l
              },
              (err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });

    });
		/*
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
				body.append('uniqueId', uniqueID);
				body.append('title', topic);
				body.append('subject', subject);
				body.append('semester', semester);
				body.append('photo', photo);
				body.append('user', "Neki")
				//body.append('title', 'A beautiful photo!');
				body.append('nova', nova)
				xhr.open('POST', "https://us-central1-svercbook.cloudfunctions.net/api/uploadPhoto");
				xhr.send(body);
				this.setState({
						taken: false,
				});
				*/
    this.props.navigation.dispatch(backAction);
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

const mapStateToProps = (state, ownProps) => {
  console.log(state, ownProps);
  return state;
}

export default connect(mapStateToProps)(Photo);