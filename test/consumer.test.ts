import { Consumer } from "../src/consumer";
import { expect, test, describe, beforeEach , afterEach} from "vitest";

import { Transaction, products } from "../src/transaction";
import { TransactionBuffer } from "../src/buffer";

describe('Consumer', () => {
  test('should consume transaction from fifoQueue', () => {
    const timeStamp = Date.now();
    const consumer = new Consumer(timeStamp, timeStamp + 30 * 60 * 1000);
    const transaction = new Transaction(products[0], 5, timeStamp + 5*60*1000);
    TransactionBuffer.addTransaction(transaction);
    consumer.consume();
    expect(consumer.totalTransactions).toBe(1);
    expect(consumer.totalSales).toBe(5);
    expect(consumer.totalSalesPerProduct.get(products[0])).toBe(5);
  });

  test('should not fail when no transaction in fifoQueue', () => {
    const timeStamp = Date.now();
    const consumer = new Consumer(timeStamp, timeStamp + 30 * 60 * 1000);
    consumer.consume();
    expect(consumer.totalTransactions).toBe(0);
    expect(consumer.totalSales).toBe(0);
  });

  test('should accumulate total sales per product correctly', () => {
    const timeStamp = Date.now();
    const consumer = new Consumer(timeStamp, timeStamp + 30 * 60 * 1000);
    const transactions = [
      new Transaction(products[0], 5, timeStamp + 6*60*1000),
      new Transaction(products[0], 3 , timeStamp + 7*60*1000),
      new Transaction(products[0], 2, timeStamp + 11*60*1000),
    ];
    transactions.forEach(transaction => TransactionBuffer.addTransaction(transaction));
    transactions.forEach(_ => consumer.consume());
    expect(consumer.totalTransactions).toBe(3);
    expect(consumer.totalSales).toBe(10);
    expect(consumer.totalSalesPerProduct.get(products[0])).toBe(10);
    // 0-minute time-based metrics should be empty

    let categoryTimestamp = new Date(timeStamp);
    categoryTimestamp.setMinutes(5);
    categoryTimestamp.setSeconds(0);
    categoryTimestamp.setMilliseconds(0);
    expect(consumer.categories[categoryTimestamp.getMinutes()]).to.not.toBeUndefined
  });
});