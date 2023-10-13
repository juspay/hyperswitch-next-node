# Hyperswitch React with TypeScript + Node Integration

Build a simple checkout web-app to collect payment details and make a test payment. Included are some basic build and run scripts you can use to run the demo application.

## Introduction

This demo application uses the following tech-stack :

**Frontend :** `React` with `TypeScript` & `NextJs`

**Backend :** `Node`

## Prerequisites

Before running the demo app, please make sure to activate your Hyperswitch secret keys (API Key and Publishable Key) in your [Hyperswitch Dashboard](https://app.hyperswitch.io/developers).

Don't have a Hyperswitch account? [Sign up here!](https://app.hyperswitch.io/register)

## Running the sample

1. Add your keys :

   - Create a `.env` file in the root directory.
   - Copy/paste the values in `.env.sample` and add you keys in the respectable area.

2. Install the dependencies :

```
npm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you save the file.
