import React, { useState } from 'react';
import { IonContent, 
  IonHeader, 
  IonPage, 
  IonButton, 
  IonGrid,
  IonCol,
  IonRow, 
  IonAlert } from '@ionic/react';
import './Scan.css';

import Searchbar from '../components/SearchBar';
// import { useCloudmersive } from '../hooks/useCloudmersive';
import { useScanner } from '../hooks/useScanner';
import { useUPCitemdb } from '../hooks/useUPCitemdb';

const Scan: React.FC = () => {

  // const { eanLookup } = useCloudmersive(); 
  const { scanBarcode } = useScanner();
  const { eanLookup } = useUPCitemdb();
  const [ ean, setEan ] = useState<string>();
  const [ error, setError ] = useState<string>();

  const scan = () => {
    clearEan();
    scanBarcode().then(code => {
      setEan(code);
      eanLookup(code);
    })
    .catch(err => {
      setError("Barcode not found.");
      console.error("Barcode Scanner Error: ", err);
    }
    );
  };

  const clearEan = () => {
    setEan("");
    setError("");
  }

  return (
    <IonPage>
      <IonHeader>
        <Searchbar/>
      </IonHeader>
      <IonContent class="ion-text-center ion-padding">
        <IonGrid>
          <IonRow class="ion-justify-content-center">
            <IonCol size="xs">
              <IonAlert 
                isOpen={!!error}
                message={"Oops! " + error}
                buttons={[
                  {
                    text: 'close',
                    handler: clearEan
                  },
                  {
                    text: 'scan again', 
                    handler: scan
                  }
                ]}
              />
              { !ean && <h1 className="ion-text-uppercase">Scan Barcode</h1> }
              { ean && <h1>{ean}</h1> }
            </IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonCol size="3">
              <IonButton 
                color="primary" 
                expand="block" 
                onClick={scan}>
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
