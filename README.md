# My Crypto Tracker

My Crypto Tracker is a web application designed to track cryptocurrency prices and conversions. The application is built using React for the frontend and Node.js for the backend. It fetches cryptocurrency data from the CoinMarketCap API and provides real-time updates to users.

## Architecture Choice and Reasoning

### Frontend
- **React:** Chosen for its component-based architecture and efficient rendering capabilities, which are essential for building a dynamic and interactive user interface.
- **React Router:** Used for navigation between different pages of the application.
- **Axios:** Utilized for making HTTP requests to fetch data from the CoinMarketCap API.
- **CSS Modules:** Employed for styling components to ensure that styles are scoped locally and do not affect other parts of the application.

### Backend
- **Node.js:** Chosen for its non-blocking, event-driven architecture, which is well-suited for I/O-heavy operations such as making API requests.
- **Express:** Used as the web server framework to handle HTTP requests and responses.
- **CORS Proxy:** Implemented to bypass the same-origin policy, allowing the frontend to make requests to the CoinMarketCap API.

### Deployment
- **Netlify:** Used for hosting the frontend. It offers continuous deployment and easy integration with GitHub.
- **Render:** Used for hosting the backend. It provides a seamless way to deploy and manage Node.js applications.

## Features
- **Homepage:** Displays a list of cryptocurrencies with their logos, current traded values, and net rise/fall in prices over the last 24 hours and 7 days.
- **CryptoConverter:** Allows users to convert from one cryptocurrency to another, showing real-time conversion rates.
- **Search Functionality:** Users can search for specific cryptocurrencies and view detailed information in a floating card.

## Usage
- Visit the [deployed application](https://your-app-url.netlify.app) to start tracking cryptocurrencies.
- Use the search bar to find specific cryptocurrencies.
- Navigate to the CryptoConverter page to convert between different cryptocurrencies.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

