import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import { connect } from 'react-redux';

export class AddButton extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    // this.navigate = this.navigate.bind(this);
  }
  navigate = () => {
    console.log(this.props);
    this.props.props.navigation.navigate('AddATopic', { key: this.props.props.navigation.state.key, unique_id: this.props.uniqueID.id, grade: this.props.props.navigation.state.params.grade, semester: this.props.props.navigation.state.params.semester, subject: this.props.props.navigation.state.params.subject })
  }
  render() {
    return (
      <Icon.Button
        name="plus"
        color="#fff"
        onPress={() => this.navigate()}
        backgroundColor="#00802b"
      />
    );
  }
}

const mapStateToProps= (state) => {
  console.log(state);
  return state;
}

export default connect(mapStateToProps)(AddButton);