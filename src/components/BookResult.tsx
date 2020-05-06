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
    IonIcon, 
    IonBadge,
    IonItem} from '@ionic/react';

import { Book } from '../hooks/useGoogleBooks';
import  Rating  from './Rating';
import { logoGoogle, logoGooglePlaystore, bookOutline, addCircle, removeCircle } from 'ionicons/icons';

const BookResult: React.FC<{
    book: Book;
    context: 'search' | 'bookshelf';
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
                <IonItem>
                    { props.book.buyLink && 
                        <IonButton fill='clear' size='large' target='_blank' href={props.book.buyLink}>
                            <IonIcon slot='start' icon={logoGooglePlaystore}/>
                        </IonButton>
                    }
                    <IonButton fill='clear' size='large' target='_blank' href={props.book.bookLink}>
                        <IonIcon slot='start' icon={logoGoogle}/>
                    </IonButton>
                    { props.context === 'search' && 
                        <IonButton fill='clear' size='large'>
                            <IonIcon slot='start' icon={addCircle}/>
                        </IonButton>
                    }
                    { props.context === 'bookshelf' && 
                        <IonButton fill='clear' size='large'>
                            <IonIcon slot='start' icon={removeCircle}/>
                        </IonButton>
                    }
                </IonItem>
            </IonCard>
        </IonCol>
    );
};

export default BookResult;