import React from 'react';
import { IonContent, 
  IonHeader, 
  IonPage, 
  IonButton, 
  IonTitle,
  IonToolbar, 
  IonSearchbar,
  IonGrid,
  IonCol,
  IonRow, 
  IonIcon } from '@ionic/react';
import { scanOutline } from 'ionicons/icons';
import './Scan.css';

const Scan: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle class="ion-margin">
            <b>BS</b> Shopper
            <IonSearchbar id="product-name" placeholder="search by product name" class="ion-margin-top"></IonSearchbar>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-text-center ion-padding">
        <IonGrid>
          <IonRow class="ion-justify-content-center">
            <IonCol size="xs">
              <h1 className="ion-text-uppercase">Scan Barcode</h1>
            </IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonCol size="3">
              <IonButton color="primary" expand="block" href="/products">Scan</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
       
      </IonContent>
    </IonPage>
  );
};

export default Scan;
