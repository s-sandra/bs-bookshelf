import { BarcodeScanner } from '@ionic-native/barcode-scanner';

export function useScanner () {

    const scanBarcode = async () => {
        const data = await BarcodeScanner.scan();
        console.log(`Barcode data: ${data.text}`);
        return data.text;
    };
    return { scanBarcode };
};

