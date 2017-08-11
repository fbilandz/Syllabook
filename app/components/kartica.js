import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, Image } from 'react-native';
import { Title } from '@shoutem/ui';
import styles from './style';

export default class Kartica extends Component {
    static propTypes = {
        title: React.PropTypes.string,
        photo: React.PropTypes.string,
    };

    render() {
        return (
            <View style={{ height: 280, width: 250, borderRadius:15, alignContent: 'center'}}>
                <Image source={{ uri: this.props.photo }} style={{ height: 250, width: 250 }} />
                <Title>{this.props.title}</Title>
            </View>
        );
    }
}