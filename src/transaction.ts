import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

export type productType = 'apple' | 'banana'|'strawberry'|'grape'|'pineapple';

export const products :productType[] = ['apple', 'banana', 'strawberry', 'grape', 'pineapple'];

const IntegerSchema = z.number().int().min(1).max(10);

const validateInteger = (value: number) => {
    try {
        IntegerSchema.parse(value);
        return true;
    } catch (error) {
        throw new Error('Amount value must be an integer between 1 and 10');
    }
};

export class Transaction {
    id: string;
    product: productType;
    amount: number;
    timestamp: number;

    constructor(product: productType, amount: number, timestamp: number) {
        //zod parse the number to be bet 1-10;
        this.id = uuidv4();
        this.product = product;
        validateInteger(amount);
        this.amount = amount; // provided its parsed properly
        this.timestamp = timestamp;
    }
}