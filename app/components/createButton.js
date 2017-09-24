import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import { connect } from 'react-redux';

export class CreateButton extends React.Component {
  constructor(props) {
    super(props);
    // this.navigate = this.navigate.bind(this);
  }
  navigate = () => {
    this.props.props.navigation.navigate('CreateNew', { unique_id: this.props.uniqueID.id, })
  }
  render() {
    return (
      <Icon.Button
        name="plus"
        color="#fff"
        onPress={() => this.navigate()}
        backgroundColor="#00802b"
        size={23}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return { uniqueID: state.uniqueID };
}

export default connect(mapStateToProps)(CreateButton);