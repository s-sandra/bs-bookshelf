import { environment } from '../environment/environment';

export function useGoogleBooks() {

    const URI = 'https://www.googleapis.com/books/v1/volumes?q=search';
    const key = `&key=${environment.booksApiConfig.browserKey}`;
    const pagination = `&startIndex=0&maxResults=5`;  // only want 5 book results

    const searchISBN = async(isbn: string) => {
        try {
            const response = await fetch(`${URI}+isbn:${isbn}${key}${pagination}`);
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
            const response = await fetch(`${URI}+intitle:${title.replace(/\s/g, "%20")}${pagination}`);
            const json = await response.json();
            return parseBooks(json);
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

            // book has a cover image
            if (volume.imageLinks) {
                cover = volume.imageLinks.thumbnail;
            }
            
            const result = {
                id: book.id,
                title: volume.title,
                rating: (volume.hasOwnProperty('averageRating') ? volume.averageRating : undefined),
                bookLink: volume.previewLink,
                buyLink: (book.saleInfo.hasOwnProperty('buyLink') ? book.saleInfo.buyLink : undefined),
                authors: (volume.hasOwnProperty('authors') ? volume.authors : undefined),
                publisher: (volume.hasOwnProperty('publisher') ? volume.publisher : undefined),
                date: (volume.hasOwnProperty('publishedDate') ? volume.publishedDate : undefined),
                image: (cover ? cover : undefined)
            }
            results.push(result);
        });
        return results;
    };

    return { 
        searchISBN, 
        searchTitle,
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