import {
    ADD_DATA,
    REMOVE_DATA,
    ADD_EMAIL,
    UNIQUE_ID
} from './types';
import firebase from '../firebase/firebase';

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

export function uniqueId(id) {
    return {
        type: UNIQUE_ID,
        id,
    }
}
