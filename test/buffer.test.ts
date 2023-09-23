import { Transaction } from "../src/transaction";
import { TransactionBuffer } from "../src/buffer";
import { expect, test, describe, beforeEach } from "vitest";


describe('Buffer', () => {
    beforeEach(() => {
        TransactionBuffer.fifoQueue.length = 0;
        TransactionBuffer.backUpQueue.length = 0;
    });

    test('should push transaction into fifoQueue when it is not full', () => {
        const transaction = new Transaction('apple', 2);
        TransactionBuffer.addTransaction(transaction);
        expect(TransactionBuffer.fifoQueue.length).toBe(1);
    });

    test('should push transaction into backUpQueue and fifoQueue when fifoQueue is full', () => {
        for(let i = 1; i < 11; i++) {            
            TransactionBuffer.addTransaction(new Transaction('banana', i));
        }
        expect(TransactionBuffer.fifoQueue.length).toBe(10);
        expect(TransactionBuffer.backUpQueue.length).toBe(0);

        const transaction = new Transaction('apple', 10);
        TransactionBuffer.addTransaction(transaction);
        expect(TransactionBuffer.fifoQueue.length).toBe(10);
        expect(TransactionBuffer.backUpQueue.length).toBe(1);
    });

    test('should maintain fifoQueue length to be 10', () => {
        for(let i = 1; i < 11; i++) {
            TransactionBuffer.addTransaction(new Transaction('grape', i));
        }        
        expect(TransactionBuffer.fifoQueue.length).toBe(10);
        for(let i = 1; i < 5; i++) {
            TransactionBuffer.addTransaction(new Transaction('grape', i));            
        }
        expect(TransactionBuffer.backUpQueue.length).toBe(4);
    });
});