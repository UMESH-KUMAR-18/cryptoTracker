# Setup Instructions

## Prerequisites
- Node.js (v14.x or higher)
- npm (v6.x or higher)
- Git

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/my-crypto-tracker.git
    cd my-crypto-tracker
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add the following environment variables:
        ```sh
        CMC_API_KEY=your-coinmarketcap-api-key
        ```

## Running the Application

### Backend
1. Navigate to the `cors-proxy` directory:
    ```sh
    cd cors-proxy
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the backend server:
    ```sh
    npm run server
    ```

### Frontend
1. Navigate back to the root directory:
    ```sh
    cd ..
    ```

2. Start the frontend server:
    ```sh
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## Deployment

### Netlify (Frontend)
1. Create a new site on Netlify and link it to your GitHub repository.
2. Set the build command to:
    ```sh
    npm run build
    ```
3. Set the publish directory to:
    ```sh
    build
    ```
4. Add the environment variable `REACT_APP_BASE_URL` with the value of your backend URL.

### Render (Backend)
1. Create a new web service on Render and link it to your GitHub repository.
2. Set the start command to:
    ```sh
    npm run server
    ```
3. Add the environment variable `CMC_API_KEY` with the value of your CoinMarketCap API key.

## Running Tests

1. Run the frontend tests:
    ```sh
    npm test
    ```

2. Run the backend tests (if any):
    ```sh
    npm run test
    ```

