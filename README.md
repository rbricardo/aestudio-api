# AE Studio API

## Setup

### Dependencies

- [Node.js](https://nodejs.org/en/download/)

### .env Configuration

Based on the `.env.example` file (located at the root of the project), create a `.env.local` and a `.env.test` with your local configuration.

```shell

# LOGGING
LOGGING_COMBINED_FILE="logs/combined.log"
LOGGING_ERROR_FILE="logs/error.log"
LOGGING_LEVEL="debug"
LOGGING_TYPE="dev"

# SERVER
SERVER_PORT="3333"
```

### Installing Packages

```shell
$ npm i
```

## Running the Project

```shell
$ npm run dev
```

## Running Tests

```shell
$ npm test
```

## Test using Postman

https://www.getpostman.com/collections/ef56d3392d118047a070

Open it, save it, import it.

## To do

Implement a cache controller to have a best performance
