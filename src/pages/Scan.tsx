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

  /**
   * Scan book barcode and query ISBN from Google Books.
   */
  const scan = async() => {
    clear();
    try {
      const code = await scanBarcode();  // get barcode text

      // if no barcode scanned
      if (code.length === 0) {
        return;
      }

      const bookResults = await searchISBN(code);  // get API response

      // change state variables
      setISBN(code);
      setResults(bookResults);
    }
    catch (err) {
      console.error(err);
      setError(err);
    }
  };

  /**
   * Resets state variables if no books found.
   * @param results - list of books from API.
   */
  const isEmpty = (results: Book[]) => {
    // no results from Google Books
    if (results.length === 0) {
      setError(`We couldn't find that book.`);
    }
  };

  /**
   * Search Google Books by book title.
   * @param title - search phrase.
   */
  const search = async(title: string | undefined) => {
    // if no search phrase
    if (!title) {
      return;
    }

    setISBN('');
    setError('');

    try {
      const bookResults = await searchTitle(title);  // fetch response from API.
      setResults(bookResults);  // update state variables
    }
    catch (err) {
      setError('Something went wrong while searching for your book');
    }
  }

  /**
   * Reset all state variables to default.
   */
  const clear = () => {
    setISBN('');
    setBookTitle('');
    setError('');
  };


  /**
   * Sets state variables according to response from
   * the Google Books API.
   * @param results - the list of books from API.
   */
  const setResults = (results: Book[]) => {
    isEmpty(results);   // sets state variables to default if no results.
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
