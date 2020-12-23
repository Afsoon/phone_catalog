# PhoneCatalog

This project is a SPA made with CRA in the front and Elixir + Phoenix in the backend. It's a simple SPA where is displayed
a list of phones where the user can:
  - See the list of phones
  - See the details of the phones
  - Add a new phone
  - Edit a phone
  - Delete a phone

The technologies that has been used are:
- Frontend
  - Create React App
  - Craco
  - PostCSS
  - TailwindCSS
  - TailwindUI for UI components
  - React Query for state management
  - React Hook Form for forms handle
  - Reakit for A11y
  - Typescript
  - React Router Dom
  - React Lottie Web for animations
  - Mock Service Worker
- Backend
  - Docker
  - Phoenix
  - Elixir
  - PostgreSQL
  - Ecto
- Ops
  - Github Actions for CI/CD
  - Gigaelixir for platform to deploy the application

## Development

To execute the application on local you have the execute the following commands:

- `docker-compose build`: It's a slowly process, so relax and make a coffee and drink it
- `docker-compose up`: The first load is the most slow, due the migrations and compilation.

After the containers are up and running, go to `localhost:3000` in your preferred browser.
