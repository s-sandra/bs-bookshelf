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
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonBadge,
  IonText, 
  IonIcon } from '@ionic/react';
import { scanOutline } from 'ionicons/icons';
import './Scan.css';

const Products: React.FC = () => {
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
      <IonContent class="ion-padding">
        <IonGrid>
          <IonRow class="ion-justify-content-center">
            <IonCol size="auto">
                <IonCard>
                    <IonCardHeader>
                        <IonBadge color="primary">$13.00</IonBadge>
                        <IonCardTitle>Product Provider Name</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonText>
                        Product description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam.
                        </IonText>
                    </IonCardContent>
                    <IonButton color="primary ion-margin">View</IonButton>
                </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
       
      </IonContent>
    </IonPage>
  );
};

export default Products;
