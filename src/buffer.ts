import { Transaction } from "./transaction";

export class TransactionBuffer {
    static fifoQueue: Array<Transaction> = [];
    static backUpQueue: Array<Transaction> = [];

    static addTransaction(transaction: Transaction) {
        if (this.fifoQueue.length < 10) {
            this.fifoQueue.push(transaction);
        } else {
            const tx = this.fifoQueue.shift();
            if (tx != null) {
                this.backUpQueue.push(tx);
            }
            this.fifoQueue.push(transaction);
        }
    }
}