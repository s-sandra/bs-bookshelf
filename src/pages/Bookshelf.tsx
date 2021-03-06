import React, { useEffect, useState } from 'react';
import { IonContent, 
  IonPage, 
  IonTitle, 
  IonGrid, 
  IonRow, 
  IonCol,
  IonHeader,
  IonToolbar,
  IonAlert,
  IonChip,
  IonIcon,
  IonButton,
  IonRouterLink} from '@ionic/react';
import './LogIn.css';

import { useFirebase } from '../hooks/useFirebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useGoogleBooks, Book } from '../hooks/useGoogleBooks';

import * as firebase from 'firebase';
import UserToast from '../components/UserToast';
import BookResult from '../components/BookResult';
import { addCircleOutline, logInOutline } from 'ionicons/icons';
import { Redirect } from 'react-router';


const Bookshelf: React.FC = () => {
    const [ user, loading ] = useAuthState(firebase.auth());
    const { googleSignIn } = useFirebase();
    const { getBookshelf } = useGoogleBooks();
    const [ books, setBooks ] = useState<Book[]>([]);
    const [ error, setError ] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            getBookshelf().then(bookResults => setBooks(bookResults))
            .catch( err => {
                    console.error(`Can't show bookshelf books.`, err);
                    setError(true);
                }
            );
        }
    }, []);

    return (
        <IonPage>
            <UserToast/>
            <IonAlert 
                isOpen={error && !loading}
                message={'Oops! An error occurred while retrieving your books.'}
                buttons={[
                    {
                        text: 'Dismiss',
                        handler: () => setError(false)
                    }
                ]}
            />
            <IonHeader>
                <IonToolbar color='primary'>
                    <IonTitle>
                    My <b>BS</b> BookShelf
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class='ion-padding'>
                { user && books.length === 0 &&
                    <IonChip id='instruction' class='ionic-justify-center-content ionic-align-items-center'>
                    <IonIcon icon={addCircleOutline}/>
                    <IonRouterLink href='/scan'>
                        <IonButton 
                            onClick={() => <Redirect to='/scan' />}>
                            Add Books
                        </IonButton>
                    </IonRouterLink>
                    </IonChip>
                }
                { !user && !loading && 
                    <IonChip id='instruction' class='ionic-justify-center-content ionic-align-items-center'>
                    <IonIcon icon={logInOutline}/>
                    <IonButton onClick={googleSignIn}>
                        Sign Into Google
                    </IonButton>
                </IonChip>
                }
                { books.length > 0 && 
                    <IonGrid fixed>
                        <IonRow>
                            { books.map(book => {   
                                return (
                                <React.Fragment key={book.id}>
                                    <IonCol size='auto'>
                                    <BookResult book={book} context='bookshelf'/>
                                    </IonCol>
                                </React.Fragment>
                                ) 
                            })
                            }
                        </IonRow>
                    </IonGrid>
                }
            </IonContent>
        </IonPage>
    );
};

export default Bookshelf;