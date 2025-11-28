# Mobile Case Shop Frontend (React)

A modern React frontend for browsing and purchasing mobile cases, styled with the Ocean Professional theme.

## Features
- Routing with react-router-dom (Home, Products, Product Detail, Cart, Checkout, Not Found)
- Global state via Context + Reducer for cart and UI theme
- API client uses `REACT_APP_API_BASE` with mock fallback controlled by `REACT_APP_FEATURE_FLAGS`
- Ocean Professional theme via CSS variables
- Accessible, responsive design

## Environment Variables
- REACT_APP_API_BASE: Base URL for backend API (e.g., https://api.example.com)
- REACT_APP_BACKEND_URL: Secondary base URL (fallback if API_BASE not set)
- REACT_APP_FEATURE_FLAGS: Comma-separated or JSON. Example:
  - "mockApi=true" to use mock API
  - '{"mockApi":true}'

Note: Do not commit secrets. Ask the orchestrator to set env vars in .env.

## Scripts
- npm start
- npm test
- npm run build

## Pages
- Home: Landing hero with CTA
- Products: Catalog with search and compatibility filter
- Product Detail: Details and add to cart
- Cart: Cart items, summary, proceed to checkout
- Checkout: Simple form posting to API
- Not Found: Fallback page

## Theme
See `src/App.css` for CSS variables and components.
