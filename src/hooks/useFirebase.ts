import * as firebase from 'firebase';

export function useFirebase() {
    var provider = new firebase.auth.GoogleAuthProvider();

    //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
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

    const redirect = () => {
        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
              // This gives you a Google Access Token. You can use it to access the Google API.
              var credential = result.credential as firebase.auth.OAuthCredential;
              var token = credential.accessToken;
              console.log(token);
            }
            // The signed-in user info.
            console.log(result.user);
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.error(`Error ${errorCode}: ${errorMessage} for ${email}`);
          });
    };


    return { googleSignIn, googleSignOut };
};