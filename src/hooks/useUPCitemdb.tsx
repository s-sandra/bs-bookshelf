import ProductResult from '../components/ProductResult';
import React, {useRef, useState} from 'react';
import { IonRow } from '@ionic/react';

// const [productList, setProductList] = useState<Array<Product>>([]);

/**
 * Stores offer response from API
 */
export class Product {
    name : string;
    price: string | number;
    desc: string;
    src: string;

    constructor(name: string, price: string | number, desc: string, src: string) {
        this.name = name;
        this.price = price;
        this.desc = desc;
        this.src = src;
    }
};
const apple = new Product("Apple", 5.99, "A tasty one.", "https://google.com");

export function useUPCitemdb() {
    /**
     * Query API for product.
     */
    const searchProductName = (product: string | undefined) => {

        // if product name actually entered.
        if (!product) {
            return;
        }

        // format search phrase for URL
        const endpoint = `api.upcitemdb.com/prod/trial/search?s=${product.replace(/\s/g, "%20")}&match_mode=0&type=product`;
        console.log(endpoint);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            hostname: 'api.upcitemdb.com',
            path: '/prod/trial/search' 
        };

        fetch("http://" + endpoint, requestOptions)
        .then(res => res.json())
        .then((result) => {
            if (+result.code > 400) {
            const offers: Array<Product> = [];
            result.items.map((item: { description: any; images: any; offers: any}) => {
                const {description, images, offers} = item;
                const offer = offers[0];
                offers.push(new Product(offer.title, offer.price, description, offer.link));
            });
            //setProductList(offers);
            return offers;
            }
        },
        (error) => {
            console.error(error);
            return null;
        });
    };

    const eanLookup = (ean: string) => {
        // format search phrase for URL
        const endpoint = `api.upcitemdb.com/prod/trial/lookup?upc=${ean}`;
        console.log(endpoint);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            hostname: 'api.upcitemdb.com',
            path: '/prod/trial/lookup' 
        };

        fetch("https://" + endpoint, requestOptions)
        .then(res => res.json())
        .then((result) => {
            if (+result.code > 400) {
                console.log(result);
            }
            console.log("yay!");
            //setProductList(offers);
        },
        (error) => {
            console.error(error);
            return null;
        });
    };

    // const clearResults = () => {
    //     setProductList([]);
    // };

    const renderResult = (product: Product) => {
        return (
            <IonRow class="ion-justify-content-center">
            <ProductResult name={product.name}
                        price={product.price}
                        desc={product.desc}
                        src={product.src}/>
            </IonRow>
        );
    };

    return {searchProductName, renderResult, Product, eanLookup };
};