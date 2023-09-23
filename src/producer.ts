import { Transaction, products } from './transaction';

export class Producer {
    static produce(startTime: number, endTimeStamp: number) : Transaction {
        const product = products[Math.floor(Math.random() * 5) + 1];
        const amount = Math.floor(Math.random() * 10) + 1; 
        console.log(`[Producer] Producing transaction: ${product} : ${amount}`);

        return new Transaction(product, amount, Producer.getRandomInt(startTime, endTimeStamp));        
    }

    static getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}