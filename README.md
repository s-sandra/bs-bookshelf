[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=s-sandra_bs-bookshelf&metric=alert_status)](https://sonarcloud.io/dashboard?id=s-sandra_bs-bookshelf)
# Barcode Scan Bookshelf
This Ionic PWA can run on Android devices and on the web. It has been deployed to Firebase
and can be accessed from [barcode-scan-shopper.web.app](https://barcode-scan-shopper.firebaseapp.com).
It utlizes the native barcode scanner to allow users to scan a book's ISBN code and search 
for that book in Google Books. 

## Finding Books
Barcode scanning only works on an Android device, so a search by title feature is provided to conduct 
a manual search. This is also useful in the event that the ISBN is not registered within Google Books, 
or the barcode scanner does not work. BS Bookshelf returns up to five matching book results, including
the book's cover image, rating, author, publisher, date, Google book link and Google Playstore link,
if available.

## Google Federated Login
Users can log into the application using their Google account. In the future, these credentials will
be used to gain access to the user's Google Bookshelf, so that they have the option of adding
the books they find to their Google library.
