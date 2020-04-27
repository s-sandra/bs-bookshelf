import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { isPlatform } from '@ionic/react';

export function useScanner () {

    const scanBarcode = async () => {
        if (isPlatform('desktop')) {
            throw new Error('Barcode scanning is not available on desktop. Try our Android app or search by book title.');
        }
        try {
            const data = await BarcodeScanner.scan();
            return data.text;
        }
        catch (err) {
            console.error(err);
            throw new Error('Could not read barcode.');
        }
        
    };
    return { scanBarcode };
}

