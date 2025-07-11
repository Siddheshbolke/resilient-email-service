# Resilient Email Sending Service

This service implements a resilient email delivery mechanism using JavaScript.

## Features

- Retry with exponential backoff
- Fallback between two providers
- Rate limiting (5 emails/minute)
- Idempotency with message ID
- Circuit breaker for failing providers
- Status tracking and logging

## Getting Started

```bash
npm install


```run command
npm start


## Run Tests

```bash
npm test
```
