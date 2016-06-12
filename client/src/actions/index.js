import axios from 'axios';
import React from 'react';
import { browserHistory } from 'react-router';

//Type Constants Imports
import { AUTH_USER, UNAUTH_USER, SIGN_IN, NOTES_FETCH, NOTE_ADD, NOTE_SELECTED, NOTE_DELETE } from './types';

const ROOT_URL = 'http://localhost:8200';

//Authentication Action Creators
export function signIn(props) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, props)
      .then(response => {
        dispatch({ type: AUTH_USER, payload: response.data.uid });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/dashboard');
      })
  }
}

export function signUp(props) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, props)
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/dashboard');
      })
  }
}

export function signOut(){
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  }
}

//Notes Action Creators
export function notesFetch(uid) {
  const userId = { uid: uid };
  return function(dispatch) {
    axios.post(`${ROOT_URL}/notes`, userId)
      .then(response => {
        dispatch({ type: NOTES_FETCH, payload: response.data.notes})
      })
  }
}

export function noteAdd(props) {
  console.log("Note add action creator props :", props);
  return function(dispatch) {
    axios.post(`${ROOT_URL}/noteAdd`, props)
      .then(response => {
        dispatch({ type: NOTE_ADD });
        browserHistory.push('/dashboard')
      })
    }
}

export function noteFetch(note) {
  return {
    type: NOTE_SELECTED,
    payload: note
  }
}

export function noteDelete(notePackage) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/noteDelete`, notePackage)
      .then(response => {
        console.log("receiving this response: ", response)
        dispatch({ type: NOTE_DELETE });
        browserHistory.push('/dashboard');
      })
  }
}
