import React, { useState } from 'react';
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
    IonItem, 
    IonToast,
    IonAlert} from '@ionic/react';

import { Book, useGoogleBooks } from '../hooks/useGoogleBooks';
import { useAuthState } from 'react-firebase-hooks/auth';
import * as firebase from 'firebase';

import  Rating  from './Rating';
import { logoGoogle, 
    logoGooglePlaystore, 
    bookOutline, 
    addCircle, 
    removeCircle } from 'ionicons/icons';

const BookResult: React.FC<{
    book: Book;
    context: 'search' | 'bookshelf';
}> = (props) => {
    const [ user ] = useAuthState(firebase.auth());
    const { addBook, removeBook } = useGoogleBooks();
    const [ action, setAction ] = useState<string>('');
    const [ deleting, setDeleting ] = useState<boolean>(false);

    const add = async() => {
        try {
            await addBook(props.book.id);
            setAction('add');
        }
        catch (err) {
            console.error(`can't add book`);
        }
        //setAction('');
    };

    const remove = async() => {
        try {
            await removeBook(props.book.id);
            setAction('remove');
        }
        catch (err) {
            console.error(`can't remove book`);
        }
        setDeleting(false);
    };

    return (
        <IonCol>
            
            <IonToast
            isOpen={action.length > 0}
            position='bottom'
            message={`Book ${action === 'add' ? 'added.' : 'removed.'}`}
            duration={3000}
            />

            <IonAlert 
                isOpen={deleting}
                message={'Are you sure you want to delete this book from your Google bookshelf?'}
                buttons={[
                {
                    text: 'cancel',
                    role: 'cancel',
                    handler: () => setDeleting(false)
                },
                {
                    text: 'remove', 
                    handler: remove
                }
                ]}
            />
            
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
                    { user && props.context === 'search' && 
                        <IonButton fill='clear' size='large' onClick={add}>
                            <IonIcon slot='start' icon={addCircle}/>
                        </IonButton>
                    }
                    { user && props.context === 'bookshelf' && 
                        <IonButton fill='clear' size='large' onClick={() => setDeleting(true)}>
                            <IonIcon slot='start' icon={removeCircle}/>
                        </IonButton>
                    }
                </IonItem>
            </IonCard>
        </IonCol>
    );
};

export default BookResult;