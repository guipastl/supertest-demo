# Supertest API testing demo

[![Testing passing](https://github.com/guipastl/supertest-demo/actions/workflows/supertest-api-tests.yml/badge.svg)](https://github.com/guipastl/supertest-demo/actions/workflows/supertest-api-tests.yml)

This repository demonstrates how to automate API tests with Supertest, Mocha, Chai, and Mochawesome against the public GoRest API.

## What this demo covers

- CRUD-style API checks for users, posts, and todos
- Request validation and assertions using Supertest and Chai
- Test data generation with Faker
- HTML reporting with Mochawesome
- Environment-based configuration with dotenv

## Project structure

- [package.json](package.json) — scripts and development dependencies
- [config.js](config.js) — shared base URL and access token configuration
- [fixtures/randomData.js](fixtures/randomData.js) — generated payload values for tests
- [test/postsTest.spec.js](test/postsTest.spec.js) — posts API checks
- [test/todosTest.spec.js](test/todosTest.spec.js) — todos API checks
- [test/usersTest.spec.js](test/usersTest.spec.js) — users API coverage

## Prerequisites

- Node.js 18+ recommended
- npm
- A valid GoRest access token

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file named `.env` in the project root with your token:

   ```bash
   ACCESS_TOKEN=your_access_token_here
   ```

3. Run the test suite:

   ```bash
   npm test
   ```

## What the tests validate

The suite covers:

- GET requests for lists and single resources
- POST requests with valid and invalid payloads
- PUT and PATCH updates for existing users
- DELETE requests for resource cleanup
- Expected status codes and response body assertions

## Reports

When the tests run, Mochawesome generates an HTML report under [mochawesome-report/mochawesome.html](mochawesome-report/mochawesome.html).

## Local execution summary

Run the full suite locally with:

```bash
npm test
```

This will execute the Mocha tests and produce a detailed HTML report for review.

---

Developed with 💚 by [Guilherme](https://www.linkedin.com/in/guipastl).