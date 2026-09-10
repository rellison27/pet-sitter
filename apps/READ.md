# Pet Sitting Booking App

React/TypeScript pet sitting booking app with a web client, shared pricing logic, and an optional Expo mobile client.
This is using the latest version of all major packages so node and npm need to be atleast 26 and npm I believe it needs to be 11 and up

This is a monorepo, I am atttemting to make having both web and mobile in one repo for ease of use. As loong as you have pnpm and nvm you should be good to get the app up and running.(I say nvm to be able to upgrade to whatever node version necessary. I'm sure you're not running an old npm like me T_T)

## Run the project

Install dependencies:

```bash
pnpm install
```

Run the web app:

```bash
pnpm dev:web
```

Run the mobile app:

```bash
pnpm dev:mobile
```

Run unit tests:

```bash
pnpm test
```

Run Playwright E2E tests:

```bash
pnpm test:e2e
```

## Assumptions

- Each booking is for one pet and one animal type.
- Booking duration must be between 2 and 8 hours.
- Pricing is calculated as a $20 base fee plus the hourly rate for the selected animal type.
- Pricing is fetched through an API rather than calculated directly in the client.
- Booking totals are recalculated on the server when a booking is created.
- Booking data is stored in memory for this assessment, so it resets when the server restarts.
- Authentication and authorization are out of scope because they were not specified in the requirements.
- The mobile app uses the same shared validation and pricing logic as the web app
