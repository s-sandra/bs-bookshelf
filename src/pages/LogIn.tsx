import React from 'react';
import { IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButton,
  IonGrid, 
  IonRow, 
  IonCol } from '@ionic/react';
import './LogIn.css';

const LogIn: React.FC = () => {
  return (
    <IonPage>

      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle class="ion-text-center ion-text-uppercase banner ion-margin-bottom">Barcode Scan</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          <IonRow class="ion-justify-content-center">
            <IonCol size="xs">
              <IonTitle color="primary" class="under banner">Shopper</IonTitle>
            </IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-center ion-text-center">
            <IonCol size="xs">
              <h3>Search for Products Online</h3>
              <h4 color="primary">by Name or Barcode</h4>
            </IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonCol size="xs">
              <IonButton color="primary" href="/scan">Sign In With Google</IonButton>
            </IonCol>
          </IonRow>
      </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default LogIn;
