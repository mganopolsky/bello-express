import { Transaction, productType } from "./transaction";
import { TransactionBuffer } from "./buffer";

export class Consumer {
    totalTransactions: number;
    totalSales: number;
    totalSalesPerProduct: Map<productType, number>;
    categories: { [index: string]: Date[] } = {};
    intervals = [0, 5, 10, 15, 20, 25, 30];
    timeBasedMetrics = new Map<number, number>();
    startTimestamp: number;
    endTimestamp: number;

    constructor(startTimestamp: number, endTimestamp: number) {
        this.totalTransactions = 0;
        this.totalSales = 0;
        this.totalSalesPerProduct = new Map<productType, number>();
        this.categories = {};
        this.startTimestamp = startTimestamp;
        this.endTimestamp = endTimestamp;
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
            this.addTransactionToTimeBasedMetrics(transaction);
            //log the values
            console.log(`[totalTransactions]: ${this.totalTransactions}`);
            console.log(`[totalSales]: ${this.totalSales}`);
            console.log(`[totalSales per ${transaction.product}]: ${this.totalSalesPerProduct.get(transaction.product)}`);
            console.log(`[fifoQueue left] ${TransactionBuffer.fifoQueue.length}`);
        }
    }

    addTransactionToTimeBasedMetrics(transaction: Transaction) {
        let timestamp = new Date(transaction.timestamp);
        let roundedMinute = Math.floor(timestamp.getMinutes() / 5) * 5;

        // Create a date object at beginning of the slice
        let categoryTimestamp = new Date(timestamp.getTime());
        categoryTimestamp.setMinutes(roundedMinute);
        categoryTimestamp.setSeconds(0);
        categoryTimestamp.setMilliseconds(0);

        // Convert categoryTimestamp to string for use as object key
        let category = categoryTimestamp.getMinutes().toString();

        // Create category if it doesn't exist
        if (!this.categories[category]) {
            this.categories[category] = [];
        }

        // Add timestamp to category
        this.categories[category].push(timestamp);
        this.printTimeBasedMetrics();
    }

    printTimeBasedMetrics() {
        console.log(`[Time-based metrics]`);
        for (let category in this.categories) {
            let count = this.categories[category].length;
            console.log(`[${category}]: ${count}`);
        }
    }
}