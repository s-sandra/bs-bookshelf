import React from 'react';
import { IonContent, 
  IonHeader, 
  IonPage, 
  IonButton, 
  IonGrid,
  IonCol,
  IonRow } from '@ionic/react';
import './Scan.css';

import Searchbar from '../components/SearchBar';
// import { useCloudmersive } from '../hooks/useCloudmersive';
import { useScanner } from '../hooks/useScanner';

const Scan: React.FC = () => {

  // const { eanLookup } = useCloudmersive(); 
  const { scanBarcode } = useScanner(); 

  return (
    <IonPage>
      <IonHeader>
        <Searchbar/>
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
              <IonButton 
                color="primary" 
                expand="block" 
                onClick={() => scanBarcode()}>
              Scan
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
       
      </IonContent>
    </IonPage>
  );
};

export default Scan;
