import React from 'react';
import { IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButton,
  IonGrid, 
  IonRow, 
  IonCol,
  IonIcon } from '@ionic/react';
import './LogIn.css';
import { logoGoogle } from 'ionicons/icons';

import { useFirebase } from '../hooks/useFirebase';
import * as firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


const LogIn: React.FC = () => {
  const { googleSignIn, googleSignOut } = useFirebase();
  const [ user ] = useAuthState(firebase.auth());

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle class='ion-text-center ion-text-uppercase banner ion-margin-bottom'>Barcode Scan</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          <IonRow class='ion-justify-content-center'>
            <IonCol size='xs'>
              <IonTitle color='primary' class='under banner'>Bookshelf</IonTitle>
            </IonCol>
          </IonRow>
          <IonRow class='ion-justify-content-center ion-text-center'>
            <IonCol size='xs'>
              <h3>Search for Google Books</h3>
              <h4 color='primary'>by Name or ISBN</h4>
            </IonCol>
          </IonRow>
          <IonRow class='ion-justify-content-center'>
            <IonCol size='xs'>
              { !user && <IonButton color='primary' onClick={googleSignIn}>
                <IonIcon slot='start' icon={logoGoogle}/>
                Sign In With Google</IonButton>}
              { user && <IonButton color='primary' onClick={googleSignOut}>
                <IonIcon slot='start' icon={logoGoogle}/>
                Sign Out From Google</IonButton>}
            </IonCol>
          </IonRow>
      </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default LogIn;
