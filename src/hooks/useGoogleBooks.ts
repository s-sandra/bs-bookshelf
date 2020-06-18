import { environment } from '../environment/environment';
import { useFirebase } from './useFirebase';
import { Plugins } from '@capacitor/core';

export function useGoogleBooks() {

    const { isExpired, googleSignOut } = useFirebase();
    const { Storage } = Plugins;
    const URI = 'https://www.googleapis.com/books/v1/';
    const key = `&key=${environment.booksApiConfig.browserKey}`;
    const pagination = `&startIndex=0&maxResults=6`;  // only want 6 book results

    const searchISBN = async(isbn: string) => {
        try {
            const response = await fetch(`${URI}volumes?q=search+isbn:${isbn}${key}${pagination}`);
            const json = await response.json();
            return parseBooks(json);
        }
        catch (err) {
            console.error(err);
            throw Error(err);
        }
    };

    const searchTitle = async(title: string) => {

        try {
            const response = await fetch(`${URI}volumes?q=search+intitle:${title.replace(/\s/g, "%20")}${pagination}`);
            const json = await response.json();
            return parseBooks(json);
        }
        catch (err) {
            console.error(err);
            throw Error(err);
        }
    };

    /**
     * Get all books in user's 'Favorite' Google bookshelf (id=0).
     */
    const getBookshelf = async() => {

        if (await isExpired()) {
            await googleSignOut();  // log out user if access token expired
            throw Error('Please sign into Google.');
        }

        try {
            const { value }  = await Storage.get({key: 'token'});
            const header = {
                headers: { 'Authorization' : `Bearer ${value}` }
            };
            const response = await fetch(`${URI}mylibrary/bookshelves/0/volumes?${key}`, header);
            const json = await response.json();
            return parseBooks(json);
        }
        catch (err) {
            console.error(err);
            throw Error(err);
        }
    };

    const addBook = async(id: string) => {

        if (await isExpired()) {
            await googleSignOut();  // log out user if access token expired
            throw Error('Please sign into Google.');
        }

        try {
            const { value }  = await Storage.get({key: 'token'});
            const header = {
                method: 'POST',
                headers: { 'Authorization' : `Bearer ${value}` }
            };
            await fetch(`${URI}mylibrary/bookshelves/0/addVolume?volumeId=${id}${key}`, header);
        }
        catch (err) {
            console.error(err);
            throw Error(err);
        }
    };

    const removeBook = async(id: string) => {

        if (await isExpired()) {
            await googleSignOut();  // log out user if access token expired
            throw Error('Please sign into Google.');
        }

        try {
            const { value }  = await Storage.get({key: 'token'});
            const header = {
                method: 'POST',
                headers: { 'Authorization' : `Bearer ${value}` }
            };
            await fetch(`${URI}mylibrary/bookshelves/0/removeVolume?volumeId=${id}${key}`, header);
        }
        catch (err) {
            console.error(err);
            throw Error(err);
        }
    };

    const parseBooks = (books: any) => {
        console.log(books);
        const results: Book[] = [];

        // book not found in API
        if (books.totalItems === 0) {
            return [];
        }

        books.items.forEach((book: { volumeInfo: any; id: string; saleInfo: any; }) => {
            const volume = book.volumeInfo;
            var cover;
            var published;

            // book has a cover image
            if (volume.imageLinks) {
                cover = volume.imageLinks.thumbnail;
            }

            if (volume.hasOwnProperty('publishedDate')) {
                published = new Date(volume.publishedDate);
                published = `${published.toLocaleString('default', { month: 'short' })} ${published.getFullYear()}`;
            }
            
            const result = {
                id: book.id,
                title: volume.title,
                rating: (volume.hasOwnProperty('averageRating') ? volume.averageRating : undefined),
                bookLink: volume.previewLink,
                buyLink: (book.saleInfo.hasOwnProperty('buyLink') ? book.saleInfo.buyLink : undefined),
                authors: (volume.hasOwnProperty('authors') ? volume.authors : undefined),
                publisher: (volume.hasOwnProperty('publisher') ? volume.publisher : undefined),
                date: (published ? published : undefined),
                image: (cover ? cover : undefined)
            }
            results.push(result);
        });
        return results;
    };

    return { 
        searchISBN, 
        searchTitle,
        getBookshelf,
        addBook,
        removeBook
    };
}

export interface Book {
    title: string,
    id: string,
    image?: string,
    authors?: string[],
    rating?: number,
    publisher?: string,
    date?: string,
    bookLink: string,
    buyLink?: string
}