import {
  ADD_DATA,
  REMOVE_DATA,
  ADD_EMAIL
} from './types';
import { combineReducers } from 'redux';

const database = (state = {}, action) => {
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        ...action.data,
      }
    default:
      return state;
  }
};

const email = (state = "", action) => {
  switch(action.type){
    case ADD_EMAIL: 
      return action.email;
    default:
      return state;
  }
}

const uniqueId = (state = "", action) => {
  switch(action.type){
    case UNIQUE_ID:
      return action.id;
    default:
      return state;
  }
}

const root = combineReducers({ database, email });
export default root;