import React from 'react';
import { IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle,
  IonToolbar, 
  IonSearchbar,
  IonGrid,
  IonCol,
  IonRow } from '@ionic/react';
import ProductResult from '../components/ProductResult';
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
                <ProductResult name="Product Provider Name"
                            price="13.99"
                            desc= "Some sort of description for product."/>
            </IonCol>
          </IonRow>
        </IonGrid>
       
      </IonContent>
    </IonPage>
  );
};

export default Products;
