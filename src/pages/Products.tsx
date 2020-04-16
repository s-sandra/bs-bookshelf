import React, {useRef, useState} from 'react';
import { IonContent, 
  IonHeader, 
  IonPage } from '@ionic/react';
import './Scan.css';
import Searchbar from '../components/SearchBar';


const Products: React.FC = () => {

  return (
    <IonPage>

      <IonHeader>
        <Searchbar/>
      </IonHeader>

      <IonContent class="ion-padding">
        {/* {productList.length > 0 &&
        (<IonGrid>
            {productList.map(renderResult)}
        </IonGrid>)} */}
      </IonContent>

    </IonPage>
  );
};

export default Products;
