import { BarcodeScanner } from '@ionic-native/barcode-scanner';

export function useScanner () {

    const scanBarcode = async () => {
        const data = await BarcodeScanner.scan();
        return data.text;
    };
    return { scanBarcode };
};

