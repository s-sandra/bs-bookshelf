import React from "react";
import { IonCard, 
    IonCardHeader, 
    IonBadge, 
    IonCardTitle, 
    IonCardContent,
    IonText, 
    IonButton } from "@ionic/react";

const ProductResult: React.FC<{
    price: number | string; 
    name: string; 
    desc: string
}> = (props) => {
    return (
        <IonCard>
            <IonBadge color="primary">${props.price}</IonBadge>
            <IonCardHeader>
                <IonCardTitle>{props.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonText>
                {props.desc}
                </IonText>
            </IonCardContent>
            <IonButton color="primary ion-margin">View</IonButton>
         </IonCard>
    );
};

export default ProductResult;