import {
  ADD_DATA,
  REMOVE_DATA,
  ADD_EMAIL,
  TOKEN_ID,
  UNIQUE_ID,
  ADMIN,
  ADD_REQUESTS,
  DONE
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
  switch (action.type) {
    case ADD_EMAIL:
      return action.email;
    default:
      return state;
  }
}

const uniqueID = (state = {}, action) => {
  switch (action.type) {
    case UNIQUE_ID:
      return {
        ...state,
        id: action.id,
      };
    case TOKEN_ID:
      return {
        ...state,
        token: action.token,
      };
    case ADMIN:
      return {
        ...state,
        admin: action.admin,
      }
    default:
      return state;
  }
}

const requests = (state = {}, action) => {
  switch (action.type) {
    case ADD_REQUESTS:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}
const loading = (state = true, action) => {
  switch (action.type) {
    case DONE:
      return false;
    default:
      return state;
  }
}

const root = combineReducers({ database, email, uniqueID, requests, loading });
export default root;