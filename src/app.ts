import { TransactionBuffer } from './buffer';
import { Consumer } from './consumer';
import { Producer } from './producer';

function main() {
  try {
    const consumer = new Consumer();

    const producerInterval = setInterval(() => {
      TransactionBuffer.addTransaction(Producer.produce());
    //}, Math.floor(Math.random() * 3) + 1);
    }, 1000);

    const consumerInterval = setInterval(() => {
      consumer.consume();
    }, 1000);

    // If we want to limit the time of execution, we can use setTimeout as below
    // If left uncommented, the program will run forever
    
    setTimeout(() => {        
      clearInterval(producerInterval);
      clearInterval(consumerInterval);

      consumeTillBufferEmpty(consumer);
    }, 10000);

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

main();