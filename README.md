# Node.js TypeScript Application

This is a Node.js application written in TypeScript that demonstrates the use of a producer-consumer pattern.

This app has defaults set for the `producer timer` (2000), `consumer timer` (1000), and the `timeout period` (15000), all in microseconds; however, these parameters can be passed into the app as such: 

`npm start producer_timer consumer_time timeout`

so, if we want to increase the default settings by 1, the input would be:

`npm start 2001 1001 15001`

## Project Structure

- `src/`: Contains the source files.
  - `buffer.ts`: Contains the `TransactionBuffer` class.
  - `consumer.ts`: Contains the `Consumer` class.
  - `producer.ts`: Contains the `Producer` class.
  - `transaction.ts`: Contains the `Transaction` class.
  - `app.ts`: The main application file.

## Prerequisites

- Node.js
- TypeScript
- npm

## Setup & Installation

Follow these steps to setup and run the project:

1. Clone the repository:
```bash
git clone https://github.com/mganopolsky/bello-express
```

2. Move into the cloned repository:
```bash
cd bello-express
```

3. Install the dependencies:
`npm install`

4. Build the app 
`npm run build`

5. Test the app 
`npm run test`

6. Run the app 
`npm run start 2001 1001 15001`