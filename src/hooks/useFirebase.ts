import * as firebase from firebase;

export function useFirebase() {
    const userLogin = async(email: any, password: any) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((response: any) => {
            console.log(response);
        },
            (        error: any) => {
            console.error(error);
        });
    };

    return { userLogin };
};