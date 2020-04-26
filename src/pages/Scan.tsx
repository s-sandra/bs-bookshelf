import React, { useState } from 'react';

import { IonContent, 
  IonHeader, 
  IonPage, 
  IonButton, 
  IonGrid,
  IonCol,
  IonRow, 
  IonAlert, 
  IonToolbar,
  IonTitle,
  IonItem,
  IonSearchbar,
  IonFooter} from '@ionic/react';
import './Scan.css';

import { useScanner } from '../hooks/useScanner';
import { useGoogleBooks, Book } from '../hooks/useGoogleBooks';
import BookResult from '../components/BookResult';

const Scan: React.FC = () => {

  const { scanBarcode } = useScanner();
  const { searchISBN, searchTitle } = useGoogleBooks();

  const [ isbn, setISBN ] = useState<string>();
  const [ error, setError ] = useState<string>();
  const [ bookTitle, setBookTitle ] = useState<string>();
  const [ books, setBooks ] = useState<Book[]>([]);

  const scan = () => {
    scanBarcode()
    .then(async code => {
      setISBN(code);
      const bookResults = await searchISBN(code);
      isEmpty(bookResults);
      setBooks(bookResults);
    })
    .catch(err => {
        setError(err);
      }
    );
  };

  const isEmpty = (results: Book[]) => {
    if (results.length === 0) {
      setError('Your book could not be found');
    }
  }

  const search = async(title: string | undefined) => {
    if (!title) {
      return;
    }

    const bookResults = await searchTitle(title);
    isEmpty(bookResults);
    setBooks(bookResults);
  }


  const clearISBN = () => {
    setISBN('');
    setError('');
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
            <IonTitle class='ion-margin'>
              <b>BS</b> BookShelf
              <IonItem color='primary'>
                <IonSearchbar
                    value={bookTitle}
                    id='product-name' 
                    placeholder='search by book title' 
                    class='ion-margin-top'
                    onIonChange={searchPhrase => setBookTitle(searchPhrase.detail.value!)}
                />
                <IonButton slot='end' onClick={() => {search(bookTitle)}}>Go</IonButton>
              </IonItem>
            </IonTitle>
          </IonToolbar>
      </IonHeader>
      <IonContent class='ion-padding'>
        <IonGrid>
          <IonRow class='ion-justify-content-center'>
            <IonCol size='xs'>
                <IonAlert 
                  isOpen={!!error}
                  message={'Oops! ' + error + '. Try our Android app or search by book title.'}
                  buttons={[
                    {
                      text: 'close',
                      handler: clearISBN
                    },
                    {
                      text: 'scan again', 
                      handler: scan
                    }
                  ]}
                />
                { isbn && <h1>ISBN {isbn}</h1> }
            </IonCol>
          </IonRow>
            { books.map(book => { 
                return (
                  <React.Fragment key={book.id}>
                    <IonRow>
                        <IonCol>
                          <BookResult book={book}/>
                        </IonCol>
                    </IonRow>
                  </React.Fragment>
                  
                ) 
              })
            }
        </IonGrid>
      </IonContent>
      <IonFooter class='ion-margin'>
        <IonButton 
            color='primary' 
            expand='block' 
            onClick={scan}>
          Scan Book
        </IonButton>
      </IonFooter>
      
    </IonPage>
  );
};

export default Scan;
