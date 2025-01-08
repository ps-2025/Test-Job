# Project Management Application

A React-based project management application designed to manage projects and favorites. The application features responsive design for both desktop and mobile views, robust error handling, and a clean, maintainable codebase.

## Key Features

- **Project Management**: View, edit, and update projects.
- **Favorite Projects Management**: Easily manage your favorite projects.
- **Responsive Design**: Optimized for mobile and desktop devices.
- **Error Handling**: Display appropriate messages for API failures.
- **Modern Practices**: Implements React hooks and a scalable architecture.

## Overview

This application demonstrates modern React development practices, including:

- Using Webpack for project setup.
- Integrating Material-UI for building user interfaces.
- Utilizing styled-components for CSS-in-JS styling.
- Creating reusable and modular components for maintainability.

## Prerequisites

Before running the application, ensure the following are installed on your system:

- **Node.js**: v18 or higher
- **npm**: v8 or higher

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Reactongraph/test-project_app
   cd test-project-app
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the Development Server**:

   - Start the JSON server for API mocking:
     ```bash
     npm run server
     ```
   - In a new terminal, start the React development server:
     ```bash
     npm start
     ```

   The application will automatically open in your default browser at [http://localhost:3000](http://localhost:3000).

## Environment Setup

1. Create a `.env` file in the root directory.
2. Copy the contents from `.env.example` into the new `.env` file.
3. Update the values in `.env` as needed.

## Available Scripts

- `npm start`: Starts the React development server.
- `npm run build`: Builds the application for production.
- `npm run server`: Starts the JSON server for API mocking.

## Project Structure

The project follows a scalable and maintainable structure:

```
src/
├── components/            # Reusable UI components
│   ├── common/            # Shared basic components
│   ├── sidebar/           # Sidebar navigation components
│   └── ErrorBoundary.jsx  # Error handling component
├── container/             # Container components for features
├── form-configs/          # Configuration files for forms
├── provider/              # Context API providers
├── services/              # API calls and service logic
├── utils/                 # Utility functions
├── hooks/                 # Custom reusable hooks
└── App.jsx                # Main application component
```

## Technologies Used

- **React**: Core library for building UI components.
- **Material-UI**: UI library for modern, responsive design.
- **Axios**: For handling HTTP requests.
- **JSON Server**: Mock API server for testing.
- **Webpack**: Module bundler for project setup.
- **Styled Components**: CSS-in-JS styling.
- **Husky**: Pre-commit hooks for linting and formatting.
- **Eslint**: For maintaining code quality.
- **Alias**: Simplified import paths for cleaner code.

## Development Notes

- The application follows a **component-based architecture** inspired by Atomic Design principles.
- All **API calls** are centralized in the `services` directory for better maintainability.
- **Form configurations** are separated into their own directory to streamline development and updates.
- Webpack is configured to support both **development** and **production** environments.

## Additional Notes

- Ensure that all API endpoints in the mock JSON server match the requirements of the application.
- Follow the provided structure for consistent coding practices and easier scalability.
