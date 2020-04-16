import React, { useState } from "react";
import {  IonButton, 
    IonToolbar, 
    IonTitle, 
    IonItem, 
    IonSearchbar } from "@ionic/react";

import { useUPCitemdb } from '../hooks/useUPCitemdb';

const Searchbar: React.FC = () => {

    const { searchProductName, 
        renderResult, Product } = useUPCitemdb();

    const [productName, setProductName] = useState<string>();
    // const [productList, setProductList] = useState<Array<Product>>([]);

    return (
        <IonToolbar color="primary">
          <IonTitle class="ion-margin">
            <b>BS</b> Shopper
            <IonItem color="primary">
              <IonSearchbar
                  value={productName}
                  id="product-name" 
                  placeholder="search by product name" 
                  class="ion-margin-top"
                  onIonChange={searchPhrase => setProductName(searchPhrase.detail.value!)}
                  //onIonClear={clearResults}
              ></IonSearchbar>
              <IonButton slot="end" onClick={() => {searchProductName(productName)}}>Go</IonButton>
            </IonItem>
          </IonTitle>
        </IonToolbar>
    );
};

export default Searchbar;