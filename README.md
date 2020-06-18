# Barcode Scan Bookshelf
This Ionic PWA runs on Android devices and on the web. It has been deployed to Firebase
and can be accessed from [barcode-scan-shopper.web.app](https://barcode-scan-shopper.firebaseapp.com).
It utlizes the native barcode scanner to allow users to scan a book's ISBN code and search 
for that book in Google Books. An updated, Angular version of the application exists [here](https://github.com/s-sandra/bs-bookshelf-angular).

## Finding Books
Barcode scanning only works on an Android device, so a search by title feature is provided to conduct 
a manual search. This is also useful in the event that the ISBN is not registered within Google Books, 
or the barcode scanner does not work. BS Bookshelf returns up to six matching book results, including
the book's cover image, rating, author, publisher, date, Google book link and Google Playstore link,
if available.

## Google Federated Login
Users can log into the application using their Google account. These credentials gain access to the user's Google Bookshelf, so that users have the option of adding the books they find to their Google library.

## Adding Books
If users log in through their Google account and give BS BookShelf permission to access their Google library, they can save scanned books to their Favorites bookshelf by clicking on the add icon within a search result.

