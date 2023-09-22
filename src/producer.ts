import { Transaction, products } from './transaction';

export class Producer {
    static produce() : Transaction {
        const product = products[Math.floor(Math.random() * 5) + 1];
        const amount = Math.floor(Math.random() * 10) + 1; 
        console.log(`[Producer] Producing transaction: ${product} : ${amount}`);
        return new Transaction(product, amount);        
    }
}