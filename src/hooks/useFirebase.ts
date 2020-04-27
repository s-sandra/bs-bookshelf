import * as firebase from 'firebase';

export function useFirebase() {
    var provider = new firebase.auth.GoogleAuthProvider();

    // ask permission to access user books
    // provider.addScope('https://www.googleapis.com/auth/books');
    const googleSignIn = async() => {
        try {
            await firebase.auth().signInWithRedirect(provider);
        }
        catch (error) {
            console.error('Unable to sign in:', error);
        }
    };

    const googleSignOut = async() => {
        firebase.auth().signOut().then(function() {
            console.log('Signed out');
          }).catch(function(error) {
            console.error(error);
          });
    };


    return { 
      googleSignIn, 
      googleSignOut 
    };
}