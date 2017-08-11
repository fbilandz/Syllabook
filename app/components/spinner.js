import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';

export class Spinner extends Component {
    static propTypes = {
        active: React.PropTypes.bool,
        buttonStyle: React.PropTypes.object,
        title: React.PropTypes.string,
        send: React.PropTypes.func
    }
    render() {
        console.log(this.props);
        return this.props.active ? <ActivityIndicator
            animating={this.props.active}
            //style={[styles.centering, { height: 80 }]}
            size="large"
        /> : <Button onPress={this.props.send} buttonStyle={this.props.buttonStyle} title={this.props.title} />
    }
}