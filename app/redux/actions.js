import {
  ADD_DATA,
  REMOVE_DATA,
  ADD_EMAIL,
  UNIQUE_ID,
  TOKEN_ID,
  ADMIN,
  ADD_REQUESTS,
  DONE
} from './types';

export function addData(data) {
  return {
    type: ADD_DATA,
    data,
  }
}

export function addEmail(email) {
  return {
    type: ADD_EMAIL,
    email,
  }
}

export function uniqueId(id, name) {
  return {
    type: UNIQUE_ID,
    id,
    name,
  }
}

export function tokenId(token) {
  return {
    type: TOKEN_ID,
    token,
  }
}

export function admin(admin) {
  return {
    type: ADMIN,
    admin,
  }
}


export function addRequest(data) {
  return {
    type: ADD_REQUESTS,
    data,
  }
}

export function Done() {
  return {
    type: DONE,
  }
}