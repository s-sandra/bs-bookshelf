import React from 'react';
import { IonCard, 
    IonCardHeader, 
    IonCardTitle,  
    IonButton, 
    IonCol,
    IonCardSubtitle,
    IonImg,
    IonChip,
    IonLabel,
    IonIcon } from '@ionic/react';

import { Book } from '../hooks/useGoogleBooks';
import  Rating  from './Rating';
import { logoGoogle, logoGooglePlaystore, bookOutline } from 'ionicons/icons';

const BookResult: React.FC<{
    book: Book; 
}> = (props) => {
    return (
        <IonCol>
            <IonCard class='book-result'>
                { props.book.image && <IonImg src={props.book.image} alt={`${props.book.title} book cover`}/> }
                { !props.book.image && 
                    <IonChip>
                        <IonLabel><IonIcon icon={bookOutline}/></IonLabel>
                    </IonChip>}
                <IonCardHeader>
                    { props.book.rating && <Rating stars={props.book.rating}/> }
                    <IonCardTitle>{props.book.title}</IonCardTitle>
                    <IonCardSubtitle>
                        {props.book.authors ? props.book.authors.join(', ') : 'No Author'}<br></br>
                        {props.book.publisher? `${props.book.publisher} ` : 'No Publisher '}
                        {props.book.date ? `(${props.book.date})` : ' No Date'}
                    </IonCardSubtitle>
                </IonCardHeader>
                <IonButton color='primary ion-margin' target='_blank' href={props.book.bookLink}>
                    <IonIcon slot='start' icon={logoGoogle}/>View
                </IonButton>
                { props.book.buyLink && 
                    <IonButton color='primary ion-margin' target='_blank' href={props.book.buyLink}>
                        <IonIcon slot='start' icon={logoGooglePlaystore}/>Buy
                    </IonButton>
                }
            </IonCard>
        </IonCol>
    );
};

export default BookResult;