import React from 'react';
import { IonContent, 
  IonPage, 
  IonTitle, 
  IonButton,
  IonGrid, 
  IonRow, 
  IonCol,
  IonIcon, 
  IonToast,
  IonHeader,
  IonToolbar} from '@ionic/react';
import './LogIn.css';

import { useFirebase } from '../hooks/useFirebase';
import * as firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import UserToast from '../components/UserToast';


const Bookshelf: React.FC = () => {
    const [ user, loading ] = useAuthState(firebase.auth());
    const { googleSignIn } = useFirebase();

    if (!user && !loading) {
        googleSignIn();
    }

    return (
        <IonPage>
            <UserToast/>
            <IonHeader>
                <IonToolbar color='primary'>
                    <IonTitle>
                    My <b>BS</b> BookShelf
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
        </IonPage>
    );
};

export default Bookshelf;