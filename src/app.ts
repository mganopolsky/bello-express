import { TransactionBuffer } from './buffer';
import { Consumer } from './consumer';
import { Producer } from './producer';

function main(producerIntervalInput: number = 2000, consumerIntervalInput: number = 1000, timeout: number = 15000) {
  try {    
    const startTimeStamp = Date.now();
    //30 minutes later
    const endTimeStamp = startTimeStamp + 30 * 60 * 1000;
    const consumer = new Consumer(startTimeStamp, endTimeStamp);

    const producerInterval = setInterval(() => {
      TransactionBuffer.addTransaction(Producer.produce(startTimeStamp, endTimeStamp));
    //}, Math.floor(Math.random() * 3) + 1);
    }, producerIntervalInput);

    const consumerInterval = setInterval(() => {
      consumer.consume();
    }, consumerIntervalInput);

    // If we want to limit the time of execution, we can use setTimeout as below
    // If left uncommented, the program will run forever
    
    setTimeout(() => {        
      clearInterval(producerInterval);
      clearInterval(consumerInterval);

      consumeTillBufferEmpty(consumer);
    }, timeout);

  } catch (error) {
    console.error("Error occurred: ", error);
    console.log(`Current state: FIFO QUEUE: ${TransactionBuffer.fifoQueue.length}, BACKUP QUEUE: ${TransactionBuffer.backUpQueue.length}`);
  }
}

function consumeTillBufferEmpty(consumer: Consumer) {
  if(TransactionBuffer.fifoQueue.length > 0 || TransactionBuffer.backUpQueue.length > 0) {
    consumer.consume();
    setTimeout(() => consumeTillBufferEmpty(consumer), 1000);
  }
}

// Get command line arguments
const producerIntervalArg = Number(process.argv[2]);
const consumerIntervalArg = Number(process.argv[3]);
const timeoutArg = Number(process.argv[4]);

main(producerIntervalArg, consumerIntervalArg, timeoutArg);