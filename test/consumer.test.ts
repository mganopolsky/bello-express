import { Consumer } from "../src/consumer";
import { expect, test, describe, beforeEach , afterEach} from "vitest";

import { Transaction, products } from "../src/transaction";
import { TransactionBuffer } from "../src/buffer";

describe('Consumer', () => {
  test('should consume transaction from fifoQueue', () => {
    const transaction = new Transaction(products[0], 5);
    const consumer = new Consumer();
    TransactionBuffer.addTransaction(transaction);
    consumer.consume();
    expect(consumer.totalTransactions).toBe(1);
    expect(consumer.totalSales).toBe(5);
    expect(consumer.totalSalesPerProduct.get(products[0])).toBe(5);
  });

  test('should not fail when no transaction in fifoQueue', () => {
    const consumer = new Consumer();
    consumer.consume();
    expect(consumer.totalTransactions).toBe(0);
    expect(consumer.totalSales).toBe(0);
  });

  test('should accumulate total sales per product correctly', () => {
    const consumer = new Consumer();
    const transactions = [
      new Transaction(products[0], 5),
      new Transaction(products[0], 3),
      new Transaction(products[0], 2),
    ];
    transactions.forEach(transaction => TransactionBuffer.addTransaction(transaction));
    transactions.forEach(_ => consumer.consume());
    expect(consumer.totalTransactions).toBe(3);
    expect(consumer.totalSales).toBe(10);
    expect(consumer.totalSalesPerProduct.get(products[0])).toBe(10);
    // 0-minute time-based metrics should be empty
    expect(consumer.timeBasedMetrics.get(0)).toBe(0);    
  });
});