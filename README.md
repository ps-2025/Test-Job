# Project Management Application

A React-based project management application with features for managing projects and favorites. The application includes responsive design for both desktop and mobile views, robust error handling, and a clean, maintainable codebase.

## Key Features

- Project management (view, edit, update)
- Favorite projects management
- Responsive design (mobile and desktop support)
- Robust error handling
- Modern React practices and patterns

## Overview

This is a React-based project management application that allows users to edit and manage projects.

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/Reactongraph/test-project_app
cd test-project-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
# Start the JSON server (API mock)
npm run server

# In a new terminal, start the React development server
npm start
```

The application will open automatically in your default browser at <http://localhost:3000>

## Environment Setup

Create a .env file and copy content from .env.example

## Available Scripts

- `npm start` - Starts the development server
- `npm run build` - Creates a production build
- `npm run server` - Starts the JSON server for API mocking

## Project Structure

```
src/
├── components/
│ ├── common/              # Shared basic UI components
│ ├── sidebar/             # Composite components
  └── ErrorBoundary.jsx    # Handle errors  components
├── container/             # Form features files
├── form-configs/          # Form configuration files
├── provider/              # Context api provider
├── services/              # API and other services
├── utils/                 # Utility functions
├── hooks                  # resuable custom hooks
└── App.jsx                # Main application component
```

## Technologies Used

- React
- Material-UI
- Axios
- JSON Server
- Webpack
- Styled Components
- Husky
- Eslint
- Alias

## Development Notes

- The application uses a component-based architecture following Atomic Design principles
- API calls are centralized in the services directory
- Form configurations are maintained separately for better maintainability
- Webpack is configured for both development and production environments
