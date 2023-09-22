import { expect, test, describe } from "vitest";
import { Transaction, products } from "../src/transaction";
import { validate as uuidValidate } from 'uuid';

describe('Transaction', () => {
  test('should create a validtransaction with given product type and amount', () => {
    const transaction = new Transaction(products[0], 5);
    expect(transaction.product).toEqual('apple');
    expect(transaction.amount).toEqual(5);
    expect(uuidValidate(transaction.id)).toBe(true);
  });

  test('should create an invalid transaction with given product type and amount', () => {
    try {
      new Transaction(products[1], 1.2);      
    } catch (error) {
      expect(error.message).toEqual('Amount value must be an integer between 1 and 10');
    }
  });
});