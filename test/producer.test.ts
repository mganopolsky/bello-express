import { Transaction, products } from '../src/transaction';
import { expect, test, describe} from "vitest";
import { Producer } from '../src/producer';

describe('Producer', () => {

  test('should produce a Transaction', () => {
    const timeStamp = Date.now();
    const transaction = Producer.produce(timeStamp, timeStamp + 30 * 60 * 1000);
    expect(transaction).toBeInstanceOf(Transaction);
  });

  test('should produce a Transaction with random product and amount', () => {
    const timeStamp = Date.now();
    const transaction = Producer.produce(timeStamp, timeStamp + 30 * 60 * 1000);    
    expect(products.includes(transaction.product)).toBe(true);
    expect(transaction.amount).toBeGreaterThan(0);
    expect(transaction.amount).toBeLessThanOrEqual(10);
  });
});