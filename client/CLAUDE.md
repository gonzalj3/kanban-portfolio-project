# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm start` - Start development server (runs on http://localhost:3000)
- `npm test` - Run tests in interactive watch mode
- `npm run build` - Build for production (outputs to `build/` folder)
- `npm run eject` - Eject from Create React App (one-way operation)

## Architecture Overview

This is a React-based kanban board application built with Create React App. The application follows a context-based state management pattern with two main providers:

### Core Structure
- **Authentication**: Managed by `AuthProvider` in `src/context/auth/auth.provider.js`
  - Uses `useReducer` for state management with separate reducers for authentication status and user data
  - Persists authentication state in localStorage
  - Provides `useAuth()` hook for consuming auth state

- **Dashboard Data**: Managed by `DashboardProvider` in `src/context/dashboard/dashboard.provider.js`
  - Handles boards, columns, cards, and user avatar data
  - Fetches initial data from `/api/v1/boards/init` endpoint
  - Provides `useDashboard()` hook for consuming dashboard state

### Key Pages & Components
- **Pages**: Board (`/`), Calendar (`/calendar`), Login, Signup, Test
- **Protected Routes**: Most pages use `ProtectedRoute` component for authentication
- **Main Components**: NavigationBar, BoardBar, Task, Column, CardDetail

### API Integration
- Backend proxy configured to `http://localhost:3001` (see package.json)
- Uses `authFetch` helper in `src/helpers/authFetch.js` for authenticated requests
- API endpoints follow `/api/v1/` pattern

### UI Framework
- Material-UI (@material-ui/core) for components and theming
- Custom theme defined in `src/themes/theme.js`
- FullCalendar integration for calendar view
- React Beautiful DND for drag-and-drop functionality

### State Management Pattern
The app uses React Context + useReducer pattern rather than Redux:
- Authentication state managed separately from dashboard state
- Reducers are simple and focused on specific state slices
- Context providers wrap different parts of the component tree as needed