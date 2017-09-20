import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import ListOfGrades from './mainpart/listOfGrades';
import ListOfSemesters from './mainpart/listOfSemesters';
import ListOfSubjects from './mainpart/listOfSubjects';
import TopicList from "./mainpart/topics";
import ListOfPhotos from './mainpart/images';
import Photo from './camera/photo';
import { AddATopic } from './mainpart/addATopic';
import AddASubject from './mainpart/addASubject';
// import { CreateNewGroup } from './auth/createNewGroup';
import Register from './auth/register';
import Login from './auth/login';
import Req from './requests/requests';
import Topic from './mainpart/topic';
import RateScreen from './mainpart/RateScreen';
import AddACommentScreen from './mainpart/addAComment';
import AddButton from './components/addButton';

export const Handle = StackNavigator({
  Grades: {
    screen: ListOfGrades,
    navigationOptions: {
      title: 'Grades',
    },
  },
  Semesters: {
    screen: ListOfSemesters,
    navigationOptions: {
      title: 'Semesters',
    },
  },
  Subjects: {
    screen: ListOfSubjects,
    navigationOptions: {
      title: 'Subjects',
    },
  },
  Topics: {
    screen: TopicList,
    navigationOptions: (navigation) => ({
      title: 'Topics',
      headerStyle: { backgroundColor: '#00802b', marginBottom: 0, },
      headerRight: (<AddButton props={navigation} />),
    }),
  },
  Images: {
    screen: ListOfPhotos,
    navigationOptions: {
      title: 'Images'
    }
  },
  Photo: {
    screen: Photo,
    navigationOptions: {
      title: 'Take a photo',
    }
  },
  AddATopic: {
    screen: AddATopic,
    navigationOptions: {
      title: "Add a topic",
    }
  },
  AddASubject: {
    screen: AddASubject,
    navigationOptions: {
      title: "Add a subject",
    }
  },
  Topic: {
    screen: Topic,
    navigationOptions: {
      title: "Topic",
    }
  },
  RateScreen: {
    screen: RateScreen,
    navigationOptions: {
      title: "Rate it",
    }
  },
  AddACommentScreen: {
    screen: AddACommentScreen,
    navigationOptions: {
      title: "Leave a Comment",
    }
  }
}, {
    initialRouteName: 'Grades',
    cardStyle: {
      backgroundColor: '#BFECCF'
    },
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#00802b',
      },
      headerTintColor: '#fff'
    }
  });

export const Admin = TabNavigator({
  HandleA: {
    screen: Handle,
    navigationOptions: {
      title: "Scripts"
    }
  },
  Req: {
    screen: Req,
    navigationOptions: {
      title: "Requests"
    }
  }
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
      inactiveBackgroundColor: "#4CBD72",
      tabStyle: {
        backgroundColor: "#00802b",
      }
    }
  }
);

export const Tabs = TabNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Login"
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: "Register"
    }
  },
  /* CreateNewGroup: {
    screen: CreateNewGroup,
    navigationOptions: {
      title: "Create Group"
    }
  },*/

});


const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  Admin: {
    screen: Admin,
  },
  HandleR: {
    screen: Handle,
  }
}, {
    headerMode: 'none',
  }
);

export default Root;