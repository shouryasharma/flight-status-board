# Real-Time Flight Status Board

# Author

Shourya Sharma - shouryasharma@gmail.com

## Overview

This is a React-based application that simulates a real-time flight status board. The application fetches flight details from travelopia mock API, updates the data every x (configurable) seconds, and allows users to view more detailed information about a specific flight.

## Overview

This is a React-based application that simulates a real-time flight status board. The application fetches flight details from a mock API, updates the data every 10 seconds, and allows users to view more detailed information about a specific flight.

## Features

- **Flight Table:** Displays flight number, airline, origin, destination, departure time, and flight status.
- **Real-Time Updates:** Data is fetched and updated every x (configurable) seconds.
- **Flight Details:** Clicking on a flight row shows detailed information about that flight.
- **Error Handling:** Displays errors if the API request fails.
- **Responsive Design:** Flight board is styled with Flexbox for responsiveness.

## Tech Stack

- **Vite** for development server and build tool.
- **React** with **TypeScript** for the frontend.
- **Fetch API** for making HTTP requests.
- **React Router** for handling navigation.
- **Jest/Vitest** for testing.
- **React Testing Library** for UI tests.

## Installation

To set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/shouryasharma/flight-status-board.git
   ```

2. Navigate to the project directory:

    ```bash
    cd flight-status-board
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

## Running the App

To start the development server and run the app:

```bash
npm run dev
```

This will start the application at [http://localhost:5173](http://localhost:5173) (or another available port if 5173 is in use).

## Running the Tests

To the tests:

```bash
npm run test
```

## Project Structure

```
src/
  components/    # React components
  services/      # API-related functions
  types/         # TypeScript types and interfaces
  utils/         # Utility/Helper functions
  App.tsx        # Main application/entry component with React Router setup
  main.tsx       # Entry point for the React application
  main.css       # Global styles
```

## Future Enhancements

- As requested