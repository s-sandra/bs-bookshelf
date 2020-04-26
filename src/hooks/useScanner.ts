import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { isPlatform } from '@ionic/react';

export function useScanner () {

    const scanBarcode = async () => {
        if (isPlatform('desktop')) {
            throw new Error('Barcode scanning is not available on desktop');
        }
        const data = await BarcodeScanner.scan();
        return data.text;
    };
    return { scanBarcode };
};

