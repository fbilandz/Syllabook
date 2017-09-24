import React, { Component } from 'react';
import { List, } from 'react-native-elements'
import {
  ActivityIndicator,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
  Dimensions,
} from 'react-native';
import { Comment } from '../components/comment';
import { connect } from 'react-redux';
import styles from '../components/style';
import _ from 'lodash';

export class CommentList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { comments } = this.props;
    console.log(comments)
    return (
      <ScrollView contentContainerStyle={{ backgroundColor: '#ffffff', minHeight: Dimensions.get('screen').height * 0.83 }}
      >
        <View style={{ alignContent: 'center', width: Dimensions.get('screen').width, borderColor: 'white' }}>
          <List containerStyle={{ borderColor: 'white', alignContent: 'center', borderWidth: 0 }}>
            {
              comments.value === 0 ? <Text>No comments yet</Text> : _.values(comments).map((item, i) => (
                item !== 1 ? <Comment
                  key={i}
                  data={item}
                /> : null
              ))
            }

          </List>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { grade, semester, subject, topic } = ownProps.navigation.state.params;
  return { comments: state.database[grade][semester][subject][topic].comments };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);