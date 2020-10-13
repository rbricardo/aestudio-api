# AE Studio API

## Setup

## Table of Contents

- [About](#About)
- [Dependencies](#Dependencies)
- [.env Configuration](#.env-Configuration)
- [Install](#Install)
- [Running the Project](#Running-the-Project)
- [Running Tests](#Running-tests)
- [Test using Postman](#Test-using-Postman)
- [To do](#To-do)

### About

*AE Studio API* is a service that requests data from a third party service that offers a list of companies. Our API filter those companies bringing the oldest company and the company that has most locations. Also those companies are organized with pagination.

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

### Install

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

Implement a cache controller to have a better performance
