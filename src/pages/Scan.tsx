import React, { useRef, useState } from 'react';
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
  const [productName, setName] = useState<string>();
  const productNameRef = useRef<HTMLIonSearchbarElement>(null);

  /**
   * Query API for product.
   */
  const searchProductName = () => {
    // get the current text in search bar.
    const product = productNameRef.current!.value;

    // if product name actually entered.
    if (!product) {
      return;
    }
    setName(product);
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle class="ion-margin">
            <b>BS</b> Shopper
            <IonSearchbar ref={productNameRef} 
                          onKeyPress={searchProductName} 
                          id="product-name" 
                          placeholder="search by product name" 
                          class="ion-margin-top">
            </IonSearchbar>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-text-center ion-padding">
        <IonGrid>
          <IonRow class="ion-justify-content-center">
            <IonCol size="xs">
              <h1 className="ion-text-uppercase">Scan Barcode</h1>
              {productName && (<h2>{productName}</h2>)}
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
