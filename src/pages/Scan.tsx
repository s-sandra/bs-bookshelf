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
  IonInput,
  IonIcon, 
  IonChip,
  IonFab,
  IonFabButton} from '@ionic/react';
import { searchSharp, scanOutline } from 'ionicons/icons';
import './Scan.css';

import { useScanner } from '../hooks/useScanner';
import { useGoogleBooks, Book } from '../hooks/useGoogleBooks';
import BookResult from '../components/BookResult';

const Scan: React.FC = () => {

  const { scanBarcode } = useScanner();
  const { searchISBN, searchTitle } = useGoogleBooks();

  const [ isbn, setISBN ] = useState<string>('');
  const [ error, setError ] = useState<string>('');
  const [ bookTitle, setBookTitle ] = useState<string>('');
  const [ books, setBooks ] = useState<Book[]>([]);

  const scan = () => {
    scanBarcode()
    .then(async code => {
      const bookResults = await searchISBN(code);
      setISBN(code);
      setResults(bookResults);
    })
    .catch(err => {
        setError(err);
      }
    );
  };

  const isEmpty = (results: Book[]) => {
    if (results.length === 0) {
      setError(`We couldn't find books with ${bookTitle ? `the title "${bookTitle}."` : `that ISBN.`}`);
    }
  }

  const search = async(title: string | undefined) => {
    if (!title) {
      return;
    }

    setISBN('');
    setError('');

    try {
      const bookResults = await searchTitle(title);
      setResults(bookResults);
    }
    catch (err) {
      setError('Something went wrong while searching for your book');
    }
  }


  const clear = () => {
    setISBN('');
    setBookTitle('');
    setError('');
  };


  const setResults = (results: Book[]) => {
    isEmpty(results);
    setBooks(results);
  }


  return (
    <IonPage>

      <IonHeader>
        <IonToolbar color='primary'>
            <IonTitle>
              <b>BS</b> BookShelf
              </IonTitle>
              <IonItem class='ion-margin'>
                <IonInput
                    value={bookTitle}
                    id='searchbar' 
                    placeholder='search by book title' 
                    onIonChange={searchPhrase => setBookTitle(searchPhrase.detail.value!)}
                />
                <IonIcon slot='start' icon={searchSharp}/>
                <IonButton slot='end' onClick={() => {search(bookTitle)}}>
                  Go
                </IonButton>
              </IonItem>
          </IonToolbar>
      </IonHeader>

      <IonAlert 
          isOpen={!!error}
          message={'Oops! ' + error}
          buttons={[
            {
              text: 'close',
              handler: clear
            },
            {
              text: 'scan again', 
              handler: scan
            }
          ]}
        />

      <IonContent class='ion-padding'>

        { !isbn && !bookTitle && books.length === 0 &&
            <IonChip id='instruction' class='ionic-justify-center-content ionic-align-items-center'>
              <IonIcon icon={scanOutline}/>
              <IonButton 
                onClick={scan}>
                Scan Book
              </IonButton>
            </IonChip>
        }
        { (isbn || books.length > 0 ) &&
          <IonGrid fixed>
            { isbn && 
              <IonRow class='ion-text-center'>
                <IonCol>
                    <h1>ISBN {isbn}</h1>
                </IonCol>
              </IonRow>
            }
            { books.length > 0 && 
              <IonRow>
                { books.map(book => {   
                    return (
                      <React.Fragment key={book.id}>
                        <IonCol size='auto'>
                          <BookResult book={book}/>
                        </IonCol>
                      </React.Fragment>
                    ) 
                  
                  })
                }
              </IonRow>
            }
          </IonGrid>
        }
      </IonContent>

      <IonFab vertical="bottom" horizontal="start" slot="fixed">
          <IonFabButton onClick={scan}>
            <IonIcon icon={scanOutline} />
          </IonFabButton>
        </IonFab>
    </IonPage>
  );
};

export default Scan;
