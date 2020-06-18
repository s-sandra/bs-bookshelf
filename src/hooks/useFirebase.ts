import * as firebase from 'firebase';
import { Plugins } from '@capacitor/core';

export function useFirebase() {
  var provider = new firebase.auth.GoogleAuthProvider();
  const { Storage } = Plugins;

  // ask permission to access user books
  provider.addScope('https://www.googleapis.com/auth/books');

  /**
   * Stores OAuth access token.
   * @param credential Google user's OAuth credential
   */
  const setCredentials = async(credential: firebase.auth.OAuthCredential) => {
    const token = credential.accessToken;
    await Storage.set({key: 'token', value: token!});
    const timestamp = Date.now().toString();
    await Storage.set({key: 'timestamp', value: timestamp});
  }

  /**
  * Returns whether user access token is expired.
  */
  const isExpired = async() => {
    const { value } = await Storage.get({key:'timestamp'});
    const HOUR = 3600000;  // one hour in milliseconds.
    if (!value) {
      return true;
    }
    if (Number(value) + HOUR <= Date.now()) {
      return true;
    }
    return false;
  }

  const googleSignIn = async() => {
    let result: firebase.auth.UserCredential;
    try {
      result = await firebase.auth().signInWithPopup(provider);
    }
    catch (error) {
      console.error('Unable to sign in:', error);
      throw Error('Unable to sign in');
    }

    if (!result.credential) {
      throw Error('Credentials not available.');
    }

    const credential = result.credential as firebase.auth.OAuthCredential;
    if (!credential.accessToken) {
      throw Error('Permission not given to view library.');
    }

    setCredentials(credential);
  };

  const googleSignOut = async() => {
    firebase.auth().signOut().then(function() {
        console.log('Signed out');
        localStorage.clear();
      }).catch(function(error) {
        console.error(error);
      });
  };


  return { 
    googleSignIn, 
    googleSignOut,
    isExpired 
  };
}