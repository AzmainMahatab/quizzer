# Trivia Quiz App

A Simple quiz project

## Run locally

- Install deps: `npm install`
- Start dev server: `npm run dev`
- Build: `npm run build`
- Start production: `npm start`

## Environment variables

Create a `.env.local` at the project root with your Firebase config, using NEXT_PUBLIC_ prefix so it is available on the
client:

```
NEXT_PUBLIC_API_KEY=...
NEXT_PUBLIC_AUTH_DOMAIN=...
NEXT_PUBLIC_PROJECT_ID=...
NEXT_PUBLIC_STORAGE_BUCKET=...
NEXT_PUBLIC_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_APP_ID=...
NEXT_PUBLIC_MEASUREMENT_ID=...
```

## Features

* Login with Google
* Choose Quiz type preference
* Check all previous quiz history

## Toolchain

* TypeScript
* Firebase
* Next.js 15 (React 19)
* Material UI