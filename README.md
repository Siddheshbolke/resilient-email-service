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

railway deploy link
https://railway.com/project/24488ae1-09fb-42db-aef0-688695ee1a8f/service/c5157a5d-e097-4957-969c-dedaae5575dc?environmentId=552918ed-b336-4667-a135-4559d648770f&id=06ff05f8-d439-4080-8c84-e3dec2bd2462#http