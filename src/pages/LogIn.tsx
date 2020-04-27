import React from 'react';
import { IonContent, 
  IonPage, 
  IonTitle, 
  IonButton,
  IonGrid, 
  IonRow, 
  IonCol,
  IonIcon, 
  IonToast} from '@ionic/react';
import './LogIn.css';
import { logoGoogle, book } from 'ionicons/icons';

import { useFirebase } from '../hooks/useFirebase';
import * as firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


const LogIn: React.FC = () => {
  const { googleSignIn, googleSignOut } = useFirebase();
  const [ user, loading ] = useAuthState(firebase.auth());

  return (
    <IonPage>

      <IonToast
        isOpen={loading}
        position='top'
        message='Signing you in...'
        duration={3000}
        color='light'
      />

      <IonContent>
        <IonGrid>
          <IonRow class='banner padding-top'>
            <IonCol>
              <IonIcon icon={book}/>
              <IonTitle class='ion-text-center'>Barcode Scan</IonTitle>
            </IonCol>
          </IonRow>
          <IonRow class='ion-justify-content-center ion-margin-bottom'>
            <IonCol size='xs'>
              <IonTitle color='primary'>Bookshelf</IonTitle>
            </IonCol>
          </IonRow>
          <IonRow class='ion-justify-content-center ion-text-center ion-margin-bottom'>
            <IonCol size='xs'>
              <h3>Search for Google Books</h3>
              <h4 color='primary'>by Title or ISBN</h4>
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
