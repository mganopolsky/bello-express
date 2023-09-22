import { productType } from "./transaction";
import { TransactionBuffer } from "./buffer";

export class Consumer {
    totalTransactions: number;
    totalSales: number;
    totalSalesPerProduct: Map<productType, number>;

    constructor() {
        this.totalTransactions = 0;
        this.totalSales = 0;
        this.totalSalesPerProduct = new Map<productType, number>();
    }

    consume() {
        console.log(`[Consumer] Starting consuming transaction`);
        const transaction = TransactionBuffer.fifoQueue.shift();
        if (transaction != null) {
            //update values
            this.totalTransactions++;
            this.totalSales += transaction.amount;
            let existingAmountPerProduct = this.totalSalesPerProduct.get(transaction.product) ?? 0;
            this.totalSalesPerProduct.set(transaction.product, existingAmountPerProduct + transaction.amount);
            //log the values
            console.log(`[totalTransactions]: ${this.totalTransactions}`);
            console.log(`[totalSales]: ${this.totalSales}`);
            console.log(`[totalSales per ${transaction.product}]: ${this.totalSalesPerProduct.get(transaction.product)}`);
            console.log(`[fifoQueue left] ${TransactionBuffer.fifoQueue.length}`);
        }
    }
}